import * as general from './index.js';

const { createGrid, AllCommunityModule, ModuleRegistry, themeQuartz } = window.agGrid;

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

//pointers to specific containers to inject HTML into
let investmentAccountsContainer;
let investmentChartContainer;
let retirementTableContainer;
let retirementChartContainer;
let investmentAccountGuidanceContainer;
let endingBalanceYearTotal;

//creating the theme for our output table
const myTheme = themeQuartz.withParams({
    backgroundColor: "#1f2836",
    browserColorScheme: "dark",
    chromeBackgroundColor: {
        ref: "foregroundColor",
        mix: 0.07,
        onto: "backgroundColor"
    },
    fontFamily: {
        googleFont: "Inclusive Sans"
    },
    foregroundColor: "#FFF",
    headerFontSize: 18
    });

//adds an investment account to the mainContentBox. This is so the user can manage multiple investment accounts
export function addInvestmentAccount() {

    investmentAccountGuidanceContainer.innerHTML = '';

    // Create a new div for the investment account
    const accountDiv = document.createElement("div");
    accountDiv.classList.add("investmentBox");

    // Set the innerHTML for the new account div
    accountDiv.innerHTML = `
        <div class="removeButtonContainer">
            <button class="removeInvestmentAccount">-</button>
        </div>
        <div class="investmentInputsBox" id = "accountID ${numberOfInvestmentAccounts}">
            <label class="topRowBox">Name 
                <input id="nameInput" class="investmentInput" value="Account ${numberOfInvestmentAccounts}">
            </label>
            <label class="topRowBox">Balance ($) 
                <input id="balanceInput" type="number" value="0" class="investmentInput">
            </label>
            <label>Yearly contribution ($) 
                <input id="contributionInput" type="number" value="0" class="investmentInput">
            </label>
            <label>Yearly increase ($) 
                <input id="yearlyIncreaseInput" type="number" value="0" class="investmentInput">
            </label>
            <label>Yearly return rate (%) 
                <input id="yearlyRateInput" type="number" value="0" class="investmentInput">
            </label>
        </div>
        
    `;

    // Append the new account div to the container without clearing existing content
    // Using += will cause the webpage to be rerendered which will clear the entered content
    investmentAccountsContainer.appendChild(accountDiv);

    numberOfInvestmentAccounts ++;
}

// collect and store all investment account data
export function updateInvestmentDictionary() {
    
    // Clear existing dictionary
    for (let key in investmentAccounts) {
        delete investmentAccounts[key];
    }
    
    // Get all investment account divs
    const accountDivs = document.querySelectorAll('.investmentInputsBox');
    
    // Loop through each investment account
    accountDivs.forEach(div => {
        const accountId = div.id;
        const inputs = div.querySelectorAll('.investmentInput');
        
        // Store data in dictionary
        investmentAccounts[accountId] = {
            name: inputs[0].value,
            startingBalance: Number(inputs[1].value),
            yearlyContribution: Number(inputs[2].value),
            yearlyIncrease: Number(inputs[3].value),
            returnRate: Number(inputs[4].value) / 100, // Convert percentage to decimal
        };
    }); 
}

// gathers the investment account data, create the table and graph
export function calculateInvestmentTable() {

    const investmentTableContainer = document.querySelector(".investmentTableContainer");
    
    investmentTableContainer.innerHTML = `<div id="investmentGrid"></div>`;

    investmentChartContainer.innerHTML = `<canvas id="investmentChart"></canvas>`;

    let gridApi;

    //creating our columns for the table
    const columnDefs = [ 
        { field: "year", headerClass: 'table-headerClass', cellClass: 'table-cell'},
        { field: "account", headerClass: 'table-headerClass', cellClass: 'table-cell'}, 
        { field: "contribution", headerClass: 'table-headerClass', cellClass: 'table-cell' }, 
        { field: "interestGained", headerClass: 'table-headerClass', cellClass: 'table-cell' }, 
        { field: "endingBalance", headerClass: 'table-headerClass', cellClass: 'table-cell' }];

    //creating the shell for our our row level data
    const rowData = [];

    const defaultColDef = {
        flex: 1,
        minWidth: 80
    };

    const yearsToProject = document.getElementById("yearsToInvest").value;

    //variables to add for the projection header
    let overallTotalContributions = 0;
    let overallTotalInterestGained = 0;

    // Data for Chart.js
    const years = [];
    const contributionData = [];
    const interestData = [];
    const totalData = [];


    //iterating through each year for the projection
    for (let year = 1; year <= yearsToProject; year++) {

        //creating our row shell. this will refresh at every iteration
        let templateRow = {year: year.toString(), 
            account: 'test' , startingBalance: 0, 
            contributions: 0, interestGained: 0, 
            endingBalance: 0};

        let startingBalanceYearTotal = 0;
        let contributionYearTotal = 0;
        let interestGainedYearTotal = 0;
        endingBalanceYearTotal = 0;

        //iterating through each account we have
        for (let [accountID, accountInformation] of Object.entries(investmentAccounts))
        {
            //also refreshing our template row here to prepare for the next account
            let templateRow = {year: year.toString(), account: 'test', startingBalance: 0, contributions: 0, interestGained: 0, endingBalance: 0};

            //handling the account name
            templateRow['account'] = accountInformation['name'];

            //handling starting balance
            let startingBalanceCalcuation = Math.ceil(accountInformation['startingBalance']);
            templateRow['startingBalance'] = general.formatIntoCurrency(startingBalanceCalcuation);

            //handling contributions
            let contributionTableValue = accountInformation['yearlyContribution'];
            templateRow['contribution'] = general.formatIntoCurrency(contributionTableValue);

            //handling interest gained
            const interestGained = (startingBalanceCalcuation + accountInformation['yearlyContribution']) * accountInformation['returnRate']
            templateRow['interestGained'] = general.formatIntoCurrency(Math.ceil(interestGained));

            //handling ending balance
            let endingBalanceCalculation = Math.ceil(startingBalanceCalcuation + interestGained + accountInformation['yearlyContribution']);
            templateRow['endingBalance'] = general.formatIntoCurrency(endingBalanceCalculation);

            //pushing our data to be adding to the table
            rowData.push(templateRow);

            //updating our data for next year
            accountInformation['startingBalance'] = endingBalanceCalculation
            accountInformation['yearlyContribution'] += accountInformation['yearlyIncrease']

            //before moving onto the next account be sure to add the totals to the yearly sum
            startingBalanceYearTotal += startingBalanceCalcuation;
            contributionYearTotal += contributionTableValue;
            interestGainedYearTotal += interestGained;
            endingBalanceYearTotal += endingBalanceCalculation;
        }

        //do a total row addition here
        templateRow = {year: "Total", 
            contribution: general.formatIntoCurrency(contributionYearTotal), 
            interestGained: general.formatIntoCurrency(interestGainedYearTotal), 
            endingBalance: general.formatIntoCurrency(endingBalanceYearTotal)};
            
        rowData.push(templateRow);

        overallTotalContributions += contributionYearTotal;
        overallTotalInterestGained += interestGainedYearTotal;

        // adding the data for the line graph
        years.push(year);
        contributionData.push(contributionYearTotal);
        interestData.push(interestGainedYearTotal);
        totalData.push(endingBalanceYearTotal);
        
        if (year == 1) {
            //resetting the original value then adding the value of the starting portfolio value
            document.getElementById("startingPortfolioValue").innerHTML = '';
            document.getElementById("startingPortfolioValue").innerHTML = general.formatIntoCurrency(startingBalanceYearTotal);
        } else if (year == yearsToProject) {
            //resetting the original value then adding the final values of the portfolio
            
            //overall contribution amount
            document.getElementById("totalContributions").innerHTML = general.formatIntoCurrency(overallTotalContributions);
        
            //overall interest gained amount
            document.getElementById("totalInterestGained").innerHTML = general.formatIntoCurrency(overallTotalInterestGained);
        
            //overall portfolio amount
            document.getElementById("endingPortfolioValue").innerHTML = general.formatIntoCurrency(endingBalanceYearTotal);
        
        };
    };

    //adding the content to our table dictionary
    const gridOptions = {
        theme: myTheme,
        columnDefs,
        rowData,
        defaultColDef
        };
        
    //creating the table
    gridApi = createGrid(document.querySelector("#investmentGrid"), gridOptions);

    const ctx = document.getElementById('investmentChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Contributions',
                    data: contributionData,
                    borderColor: '#36A2EB',
                    backgroundColor: '#36A2EB',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Interest Gained',
                    data: interestData,
                    borderColor: '#FF6384',
                    backgroundColor: '#FF6384',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Total Portfolio',
                    data: totalData,
                    borderColor: '#4BC0C0',
                    backgroundColor: '#4BC0C0',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Investment Growth Over Time',
                    color: '#FFF',
                    font: {
                        size: 18
                    }
                },
                subtitle: {
                    display: true,
                    text: 'Click on a legend item below to add/remove',
                    color: '#FFF',
                    font: {
                      size: 16,
                      weight: 'normal'
                    }
                  },
                legend: {
                    labels: {
                        color: '#FFF'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        color: '#FFF'
                    },
                    ticks: {
                        color: '#FFF'
                    },
                    grid: {
                        color: '#555'
                    }
                },
                y: {
                    title: {
                        display: false,
                        text: 'Amount (USD)',
                        color: '#FFF'
                    },
                    ticks: {
                        color: '#FFF',
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    },
                    grid: {
                        color: '#555'
                    }
                }
            }
        }
    });
}

//takes the final investment account balance and uses it to project retirement
export function calculateRetirement() {
    retirementTableContainer.innerHTML = `<div id="retirementGrid"></div>`;

    retirementChartContainer.innerHTML = `<canvas id="retirementChart"></canvas>`;

    let gridApiRetirement;

    //creating our columns for the table
    const columnDefs = [ 
        { field: "year", headerClass: 'table-headerClass', cellClass: 'table-cell'},
        { field: "startingBalance", headerClass: 'table-headerClass', cellClass: 'table-cell'},
        { field: "income", headerClass: 'table-headerClass', cellClass: 'table-cell'}, 
        { field: "interestGained", headerClass: 'table-headerClass', cellClass: 'table-cell' }, 
        { field: "endingBalance", headerClass: 'table-headerClass', cellClass: 'table-cell' }];

    //creating the shell for our our row level data
    const rowData = [];

    const defaultColDef = {
        flex: 1,
        minWidth: 80
    };

    // divide by 100 because we want a %
    const withdrawRate = Number(document.getElementById("withdrawInput").value) / 100; 
    const returnRate = Number(document.getElementById("returnRateInput").value) / 100;

    //gathering the rest of the relevant data for our calculations
    const expenses = Number(document.getElementById("expensesInput").value);
    const yearsInRetirement = Number(document.getElementById("retirementYears").value);
    let retirementBalance = endingBalanceYearTotal;

    // Data for Chart.js
    const years = [];
    const retirementBalanceData = [];
    const incomeData = [];

    for (let year = 1; year <= yearsInRetirement; year++) {

        //creating our row shell. this will refresh at every iteration
        let templateRow = {year: year.toString(), startingBalance:0, income: 0 , interestGained: 0, endingBalance: 0};

        console.log('expenses:');
        console.log(expenses);

        //adding the starting balance
        templateRow['startingBalance'] = general.formatIntoCurrency(retirementBalance);

        //deducting the expenses
        retirementBalance = retirementBalance - expenses;

        //calculating the income then deducting the withdraw amount from the retirement balance
        let incomeForTheYear = retirementBalance * withdrawRate;
        templateRow['income'] = general.formatIntoCurrency(incomeForTheYear);
        retirementBalance -= incomeForTheYear

        //calculating the interest gained 
        let interestGained = retirementBalance * returnRate;
        templateRow['interestGained'] = general.formatIntoCurrency(interestGained);
        

        //adding the interest gained back into the account then updating our ending retirement balance
        retirementBalance += interestGained
        templateRow['endingBalance'] = general.formatIntoCurrency(retirementBalance);

        //pushing our data to be adding to the table
        rowData.push(templateRow);

        // adding the data for the line graph
        years.push(year);
        retirementBalanceData.push(retirementBalance);
        incomeData.push(incomeForTheYear);
    }

    //updating the retirement headers
    document.getElementById("startingRetirementValue").innerHTML = general.formatIntoCurrency(endingBalanceYearTotal);
    document.getElementById("finalRetirementValue").innerHTML = general.formatIntoCurrency(retirementBalance);

    //calculating the average income over the retirement years
    const averageIncome = incomeData.reduce((sum, val) => sum + val, 0) / incomeData.length;
    document.getElementById("yearlyIncome").innerHTML = general.formatIntoCurrency(averageIncome);

    //gathering the total expenses paid over the total years of retirement
    let expensesPaid = expenses * yearsInRetirement;
    document.getElementById("expensesPaid").innerHTML = general.formatIntoCurrency(expensesPaid);

    //adding the content to our table dictionary
    const gridOptions = {
        theme: myTheme,
        columnDefs,
        rowData,
        defaultColDef
        };
        
    //creating the table
    gridApiRetirement = createGrid(document.querySelector("#retirementGrid"), gridOptions);

    const ctx = document.getElementById('retirementChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Retirement Balance',
                    data: retirementBalanceData,
                    borderColor: '#36A2EB',
                    backgroundColor: '#36A2EB',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Income',
                    data: incomeData,
                    borderColor: '#FF6384',
                    backgroundColor: '#FF6384',
                    fill: false,
                    tension: 0.1
                }                
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Retirement Balance & Income Overtime',
                    color: '#FFF',
                    font: {
                        size: 18
                    }
                },
                subtitle: {
                    display: true,
                    text: 'Click on a legend item below to add/remove',
                    color: '#FFF',
                    font: {
                      size: 16,
                      weight: 'normal'
                    }
                  },
                legend: {
                    labels: {
                        color: '#FFF'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        color: '#FFF'
                    },
                    ticks: {
                        color: '#FFF'
                    },
                    grid: {
                        color: '#555'
                    }
                },
                y: {
                    title: {
                        display: false,
                        text: 'Amount (USD)',
                        color: '#FFF'
                    },
                    ticks: {
                        color: '#FFF',
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    },
                    grid: {
                        color: '#555'
                    }
                }
            }
        }
    });

}

// Event listener for Invest shortcut button (renders the investment content)
export function setupInvestmentShortcutListener (investShortcutBtn, mainContentInitiation) { 
    investShortcutBtn.addEventListener("click", function () {

        general.clearContainers();

        //adding the title for the investment section
        mainContentInitiation('Investing and Retirement');

        general.introContainer.insertAdjacentHTML('beforeend', 
            `<div class="icon-container">
                    <p class="icon"> i </p> 
                        <div class="hover-box">
                            <p class="instructionsText">Instructions:</p> 
                            <ol class="instructionsText">
                                <li>Enter your investment accounts using the green "Add Account" button.</li><br>
                                <li>Enter the number of years you would like to project your investments to grow.</li><br>
                                <li>Enter the yearly retirement information. Expenses can be taxes/fees/etc.</li><br>
                                <li>Click the green "Calculate" button then watch your money work for you!</li><br>
                                <li>To make edits, simply update the inputs you would like and click calculate again.</li>
                            </ol>
                        </div>
                </div>`
        );

        //redering our Control panel
        general.pageContentContainer.insertAdjacentHTML('beforeend',  
        `   <div class="controlPanel">

                <div class = 'controlPanelContainer'>
                    <p class = 'controlPanelHeader'>Investments</p>
                    <div class = projectionControls>
                        <button class = 'controlButton' id="addInvestmentAccount">Add Account</button> 
                        <label class = 'controlInput'> 
                            Years to invest
                            <input type="number" value="20" id="yearsToInvest">
                        </label>
                    </div>
                </div>

                <div class = controlPanelContainer>
                    <p class = 'controlPanelHeader'>Retirement</p>
                    <div class = projectionControls>
                        <label class = 'controlInput'> 
                            Withdraw Rate (%)
                            <input type="number" value="4" id="withdrawInput">
                        </label>
                        <label class = 'controlInput'> 
                            Return Rate (%)
                            <input type="number" value="7" id="returnRateInput">
                        </label>
                        <label class = 'controlInput'> 
                            Expenses ($)
                            <input type="number" value="1000" id="expensesInput">
                        </label>
                        <label class = 'controlInput'> 
                            Years in Retirement
                            <input type="number" value="20" id="retirementYears">
                        </label>
                    </div>
                </div>

                <button class = 'controlButton' id="calculateInvestments">Calculate</button>
            </div> `);

            //redering our investment section
            general.pageContentContainer.insertAdjacentHTML('beforeend',
            `<div class="investmentSection">

                <p class = 'sectionHeader'>Investments</p>
            
                <div class="investmentAccountsContainer">
                    <div class = 'investmentAccountGuidanceContainer'>    
                        <p class="onScreenGuidance">Your money making machines will be displayed here</p>
                    </div>   
                </div>  
            
                <div class="projectionHeaders">
                    <div class="projectionHeader">
                        <p>Starting Portfolio Value</p>
                        <p class = 'calculatedValue' id="startingPortfolioValue"> </p>
                    </div>

                    <div class="projectionHeader">
                        <p>Total Contributions</p>
                        <p class = 'calculatedValue' id="totalContributions"> </p>
                    </div>

                    <div class="projectionHeader">
                        <p>Total Interest Gained</p>
                        <p class = 'calculatedValue' id="totalInterestGained"> </p>
                    </div>

                    <div class="projectionHeader">
                        <p>Final Portfolio Value</p>
                        <p class = 'calculatedValue' id="endingPortfolioValue"> </p>
                    </div>
                </div>
            
                <div class="investmentTableContainer">
                </div>

                <div class ="investmentChartContainer">
                    <canvas id="investmentChart"></canvas>
                </div> 
            </div>`);

            //redering our retirement section
            general.pageContentContainer.insertAdjacentHTML('beforeend',
                `<div class="retirementSection">
    
                    <p class = 'sectionHeader'>Retirement</p>
                
                    <div class="projectionHeaders">
                        <div class="projectionHeader">
                            <p>Starting Retirement Value</p>
                            <p class = 'calculatedValue' id="startingRetirementValue"> </p>
                        </div>
    
                        <div class="projectionHeader">
                            <p>Average Yearly Income</p>
                            <p class = 'calculatedValue' id="yearlyIncome"> </p>
                        </div>
    
                        <div class="projectionHeader">
                            <p>Total Expenses</p>
                            <p class = 'calculatedValue' id="expensesPaid"> </p>
                        </div>
    
                        <div class="projectionHeader">
                            <p>Final Retirement Value</p>
                            <p class = 'calculatedValue' id="finalRetirementValue"> </p>
                        </div>

                    </div>
                
                    <div class="retirementTableContainer">
                    </div>
    
                    <div class ="retirementChartContainer">
                        <canvas id="retirementChart"></canvas>
                    </div> 
                </div>`);

        investmentAccountsContainer = document.querySelector(".investmentAccountsContainer");
        investmentAccountGuidanceContainer = document.querySelector(".investmentAccountGuidanceContainer");
        
        investmentChartContainer = document.querySelector(".investmentChartContainer");
        retirementTableContainer = document.querySelector(".retirementTableContainer");
        retirementChartContainer = document.querySelector(".retirementChartContainer");

        //resetting our number back to 1
        numberOfInvestmentAccounts = 1;
    
    // Attach event listener for the add account button. 
    // this added it to the parent container so we dont have to worry about reattaching it when we clear the contents
    general.pageContentContainer.addEventListener("click", function (event) {
        

        //triggers if the button we clicked has the class removeButton
        if (event.target.classList.contains("removeInvestmentAccount")) {
            // Find the parent div of the button (the investment account div)
            const investmentAccountDiv = event.target.closest('.investmentBox');
            
            // Remove the parent div from the DOM
            investmentAccountDiv.remove();

            numberOfInvestmentAccounts --;
        }
        
        if (event.target.id === "addInvestmentAccount") {
            addInvestmentAccount();
        }

        if (event.target.id === "calculateInvestments") {
            updateInvestmentDictionary();
            calculateInvestmentTable();
            calculateRetirement();
        }
    });

});

}

//dictionary to store investment account information
export const investmentAccounts = {};

//invesment variables
export let numberOfInvestmentAccounts = 1;
