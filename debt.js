import * as general from './index.js';

const { createGrid, AllCommunityModule, ModuleRegistry, themeQuartz } = window.agGrid;

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

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

let currentPayoffStrategy;
let payoffBudget;
let debtButtonsLoaded = false;
let debtVisualsLoaded = false;

// Array of 10 common colors (excluding red)
const colorPalette = [
    "#36A2EB", // Blue
    "#4BC0C0", // Teal
    "#9966FF", // Purple
    "#FFCE56", // Yellow
    "#2ecc71", // Green
    "#f39c12", // Orange
    "#1abc9c", // Turquoise
    "#9b59b6", // Lavender
    "#3498db", // Sky Blue
    "#7f8c8d"  // Gray
];

function handleDebtSetupClick() {
    general.clearContainers();

    //adding the title for the debt sectionF
    general.mainContentInitiation('Tackling Debt');

    general.introContainer.insertAdjacentHTML('beforeend', 
        `<div class="icon-container">
                <p class="icon"> i </p> 
                    <div class="hover-box">
                        <p class="instructionsText">Instructions:</p> 
                        <ol class="instructionsText">
                            <li>Choose your payoff strategy. (Snowball/Avalanche)</li><br>
                            <li>Enter your payoff budget amount. This is the money you have to cover minimum payments and extra funds.</li><br>
                            <li>Enter your debt accounts using the green "Add Account" button.</li><br>
                            <li>Click calculate to watch the stress fade away.</li><br>
                            <li>Ensure to check different strategies to find what is best for you.</li><br>
                        </ol>
                    </div>
            </div>`
    );

    //generating a random number
    let randomNum = Math.floor(Math.random() * 12) + 1;

    //quotes to pick from
    const quotes = {
        1: 'Every dollar you pay toward your debt is a vote for your freedom.',
        2: 'Debt is just a chapter, not your whole story. Take control, turn the page, and write your future.',
        3: 'The moment you choose to face your debt is the moment you choose peace and freedom over stress and oppression.',
        4: 'Debt may whisper defeat, but your discipline shouts victory.',
        5: 'Freedom does not start when you are out of debt. It begins the moment you decide to fight for it.',
        6: 'The weight of debt feels lighter with every intentional step toward freedom.',
        7: 'Your debt does not define you. Your determination does.',
        8: 'Paying off debt is not punishment, it is power reclaimed.',
        9: 'Debt is temporary. The freedom you are building will last a lifetime.',
        10: 'You are not just paying off debt. You are proving you are stronger than your setbacks.',
        11: 'Behind every payment is a person choosing progress over paralysis.',
        12: 'Debt-Free is not just a dream. It is a destination you are already heading toward.'
    };

    //quote to input
    let quoteToUse = quotes[randomNum];

    //setting up the main content layout
    general.pageContentContainer.insertAdjacentHTML('beforeend', 
        `
        <div class = 'masterDebtContainer centered'>
            <div class='debtQuoteContainer debtTopicContainer centered'>
                <p id = 'randomQuote'></p>
            </div>
            <div id = 'debtAccountsContainer' class='debtTopicContainer centered'>
                
            </div>
        </div>
        `);

    //creating pointer to the quote box 
    const quoteText = document.getElementById('randomQuote');

    //updating the quote
    quoteText.innerHTML = quoteToUse;

    //pointer to the container with the debt accounts and table
    const debtAccountsContainer = document.getElementById('debtAccountsContainer');

    //inserting the debt HTML
    debtAccountsContainer.innerHTML = 
        `
        <div class = 'debtStrategiesContainer centered'>
            <p class = 'debtSubSectionTitle darkTitle'>Strategy</p>
            <div class="strategySelections">
                <button class = 'controlButton blueButton' id="selectedSnowball">Snowball</button>
                <button class = 'controlButton blueButton' id="selectedAvalanche">Avalanche</button>
            </div>
        </div>

        <div class = 'debtControlsPanel centered'>
            <label id= 'debtBudgetPayoff' class="controlInput">Payoff Budget
                <input id="debtBudgetInput" value="750">
            </label>
            <button class = 'controlButton greenButton' id="addDebtAccount">Add Account</button>
            <button class = 'controlButton greenButton' id="debtCalculation">Calculate</button> 
        </div>

        <div class = 'debtTableContainer centered'>
            <table class = 'debtTable'>
                            <colgroup>
                                <col style="width: 10%;">
                                <col style="width: 30%;">
                                <col style="width: 20%;">
                                <col style="width: 25%;">
                                <col style="width: 15%;">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Balance</th>
                                    <th>Minimum Payment</th>
                                    <th>Interest Rate</th>                                        
                                </tr>
                            </thead>
                                <tbody id='debtManagementTable'>
                                    <tr>
                                        <td>
                                            <div class="removeButtonContainer">
                                                <button class="removeAccount">-</button>
                                            </div>
                                        </td>
                                        <td contenteditable="true">Credit Card</td>
                                        <td contenteditable="true">7000</td>
                                        <td contenteditable="true">350</td>
                                        <td contenteditable="true">23</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="removeButtonContainer">
                                                <button class="removeAccount">-</button>
                                            </div>
                                        </td>
                                        <td contenteditable="true">Personal Loan</td>
                                        <td contenteditable="true">5000</td>
                                        <td contenteditable="true">200</td>
                                        <td contenteditable="true">5</td>
                                    </tr>
                                </tbody>                                    
                        </table> 
            
        </div>

        <div class = 'projectionHeaders'>
            <div class = 'projectionHeader' id='debtFreeDateContainer'>
                <p> Debt free date </p>
                <p id='debtFreeDate'></p>
            </div> 
            <div class = 'projectionHeader'>
                <p> Months from today </p>
                <p id='debtMonthsFromToday'></p>
            </div> 
            <div class = 'projectionHeader'>
                <p> Total Interest </p>
                <p id='debtTotalInterestPaid'></p>
            </div> 
        
        </div>
        `;
    
    //creating pointers to the debt strategy buttons
    const snowballBtn = document.getElementById("selectedSnowball");
    const avalancheBtn = document.getElementById("selectedAvalanche");

    //preventing duplicate event listeners being loaded
    if (!debtButtonsLoaded)
    {
        general.pageContentContainer.addEventListener("click", function (event) {

            //add a row to the debt table
            if (event.target.id === "addDebtAccount") {
                addRowToTable("debtManagementTable");
                }
        })

        debtButtonsLoaded = true;
              
    }

    //setting up a general listner function
    //here we can set up custom event listners inside our Page Content Container
    general.pageContentContainer.addEventListener("click", function (event) {

                
        //clicking the snowball button
        if (event.target.id === "selectedSnowball") {
            
            //updating the debt payoff strategy
            currentPayoffStrategy = 'Snowball';

            //swapping the color so the user will see that the strategy the selected is pressed
            snowballBtn.style.backgroundColor = "#236caf";
            avalancheBtn.style.backgroundColor = "#3a94e7";
            }

        //clicking the avalanche button
        if (event.target.id === "selectedAvalanche") {
            currentPayoffStrategy = 'Avalanche';
            avalancheBtn.style.backgroundColor = "#236caf";
            snowballBtn.style.backgroundColor = "#3a94e7";
            }

        //clicking the debt calculate button
        if (event.target.id === "debtCalculation") {
            calculateDebtPayoff();
            }


        //triggers if the button we clicked has the class removeButton
        if (event.target.classList.contains("removeAccount")) {

            // Finding the table row when the button resides
            const tableRow = event.target.closest('tr');
            
            //remove the row
            tableRow.remove();

            }
        });

        //defaulting the selection to the snowball as its the most popular
        snowballBtn.click();

}


export function setupDebtShortcutListener (debtShortcutBtn) {

        debtShortcutBtn.addEventListener ('click', handleDebtSetupClick);
    
}

function addRowToTable (tableID) {
    const table = document.getElementById(tableID);

    const newRow = document.createElement('tr');

     newRow.innerHTML = `
     <td>
        <div class="removeButtonContainer">
            <button class="removeAccount">-</button>
        </div>
     </td>
     <td contenteditable="true">Account</td>
     <td contenteditable="true">1000</td>
     <td contenteditable="true">100</td>
     <td contenteditable="true">5</td>
    `;

    table.appendChild(newRow);
}

function calculateDebtPayoff () {

    const masterDebtContainer = document.querySelector('.masterDebtContainer');

    if (!debtVisualsLoaded)
    {
        //adding the grid and table containers
        masterDebtContainer.insertAdjacentHTML('beforeend',

        `
            <div class='debtTopicContainer debtGridContainer centered'>
                <div id = 'debtGrid'> </div>
            </div>
            <div class='debtTopicContainer centered debtLineGraphContainer'>
                <canvas id="debtLineGraph"></canvas>
            </div>
        `
        );

        debtVisualsLoaded = true;

    } else {
        //if our visuals are already added we clear them instead of adding another more containers
        
        const debtGridContainer = document.querySelector('.debtGridContainer');
        const debtLineGraphContainer = document.querySelector('.debtLineGraphContainer');

        
        debtGridContainer.innerHTML = 
            `
                <div id = 'debtGrid'> </div>
                
            `;

        debtLineGraphContainer.innerHTML = 
            `
                <canvas id="debtLineGraph"></canvas>
            `;

    }


    


    // Creation of pointer
    const tableBody = document.getElementById('debtManagementTable');
    const debtLineGraphContainer = document.querySelector('.debtLineGraphContainer');
    const debtGrid = document.getElementById('debtGrid');

    //clearing the contents
    debtLineGraphContainer.innerHTML = `<canvas id="debtLineGraph"></canvas>`;
    debtGrid.innerHTML = ``;

    let debtGridApi;

    //creating our columns for the debt data table
    const columnDefs = [ 
        { field: "month", headerClass: 'table-headerClass', cellClass: 'table-cell'},
        { field: "account", headerClass: 'table-headerClass', cellClass: 'table-cell'},
        { field: "payment", headerClass: 'table-headerClass', cellClass: 'table-cell'},
        { field: "interest", headerClass: 'table-headerClass', cellClass: 'table-cell'},
        { field: "balance", headerClass: 'table-headerClass', cellClass: 'table-cell'}
    ];

    //creating the shell for our our row level data
    const rowData = [];

    const defaultColDef = {
        flex: 1,
        minWidth: 80
    };

    // Data for the investment line graph
    const chartMonthsStorage = [];
    let chartAccountData = {
        'Interest' : {
            label: 'Interest',
            data: [],
            borderColor: '#b30000',
            backgroundColor: '#b30000',
            fill: false,
            tension: 0.1
        }

    };
    let chartInputArray = [];
    
    // Initialize the debtAccountsInfo dictionary. this will be our main storage of data
    let debtAccountsInfo = {};

    //pointer to the last color used
    let colorIndex = 0;

    // Loop through all rows in the table
    const rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        
        // Get the cells in the current row
        const cells = rows[i].getElementsByTagName('td');

        //extracting the accountinformation
        let accountName = cells[1].textContent.trim();
        let accountBalance = parseFloat(cells[2].textContent.trim());
        let accountMinPayment = parseFloat(cells[3].textContent.trim());
        let accountRate= parseFloat(cells[4].textContent.trim()) / 100; //converting decimal

        //adding our accounts to our dictionary storage
        debtAccountsInfo[accountName] = {
            'balance': accountBalance, 
            'minPayment': accountMinPayment,
            'rate': accountRate,
            'paid': false
        }

        //initializing a data shell add data to
        chartAccountData[accountName] = {
            label: accountName,
            data: [],
            borderColor: colorPalette[colorIndex],
            backgroundColor: colorPalette[colorIndex],
            fill: false,
            tension: 0.1
        }

        colorIndex ++;
        //resetting the color index back to 0 if we have more than 10 accounts
        if (colorIndex > 10) {colorIndex = 0;}

    }

    //sort the debt accounts based on strategy
    if (currentPayoffStrategy == 'Snowball') {
        debtAccountsInfo = sortAccountsByProperty(debtAccountsInfo, 'balance', true);
    } else {
        debtAccountsInfo = sortAccountsByProperty(debtAccountsInfo, 'rate', false);
    }

    //calculating the totalDebt. this is how we will know to stop the while loop
    let totalDebt = 0;
    for (let key in debtAccountsInfo) {
        totalDebt += debtAccountsInfo[key]['balance'];
    }

    //grabbing the payoff budget value
    payoffBudget = Number(document.getElementById("debtBudgetInput").value);

    //storing the total interest paid number to display later. some people will want to minimize this
    let totalInterestPaid = 0;

    let month = 1;

    //storage variable for when our payment is excess of a balance
    let leftoverMonthlyPayment = 0;

    //creating a loop to continue until the debt is paid off
    while (totalDebt > 0) {

        //creating our row shell. this will refresh at every iteration
        //we have this twice because we do it for every account and year
        let totalRow = {month: 'Total', 
            account: '' , payment: 0, 
            interest: 0, balance: 0};

        console.log('on month ' + String(month));
 
        //totaling the minimum payments
        let totalMinPayments = 0;
        for (let key in debtAccountsInfo) {
            //check if account is paid, if so skip here
            if (debtAccountsInfo[key]['paid']) {
                continue;
            }

            totalMinPayments += debtAccountsInfo[key]['minPayment'];
        }

        //point to which account we are on. 1 will be our primary account in which we will apply an extra funds to
        let accountOrder = 1;

        //then we take the difference
        let totalLeftoverAmount = payoffBudget - totalMinPayments;

        //apply the payments to each account
        for (let key in debtAccountsInfo) {

            //check if account is paid, if so skip here
            if (debtAccountsInfo[key]['paid']) {
                continue;
            }

            let templateRow = {month: month.toString(), 
                account: 'test' , payment: 0, 
                interest: 0, balance: 0};

            //handling the account name
            templateRow['account'] = key;

            //calculating the monthly interest. divide by 12 for monthly interest not yearly
            let accountInterestAccrual = debtAccountsInfo[key]['balance'] * (debtAccountsInfo[key]['rate'] / 12)
            totalInterestPaid += accountInterestAccrual
            console.log(key + '-interest: ' + String(Math.round(accountInterestAccrual)));
            templateRow['interest'] = general.formatIntoCurrency(accountInterestAccrual);
            totalRow['interest'] += accountInterestAccrual;

            //adding interest to the balance
            debtAccountsInfo[key]['balance'] += accountInterestAccrual
            
            //checking if we are about to use leftover monthly funds
            let leftoverFunds = leftoverMonthlyPayment > 0;

            //initiating the paymentTotal variable
            let paymentTotal;
          

            //making the payment

            //checking if we are on the first account. this lets us know to apply the extra leftover amount
            if (accountOrder == 1) {

                //calculating our full payment
                paymentTotal = debtAccountsInfo[key]['minPayment'] + totalLeftoverAmount + leftoverMonthlyPayment;

                //checking if we will be paying off the account
                if (debtAccountsInfo[key]['balance'] <= paymentTotal) {
                    debtAccountsInfo[key]['paid'] = true;

                    //this is cash we didnt use to pay on our primary account
                    leftoverMonthlyPayment = paymentTotal - debtAccountsInfo[key]['balance'];

                    //inputting the data of the balance for the payment since we paid it off. 
                    templateRow['payment'] = general.formatIntoCurrency(debtAccountsInfo[key]['balance']);
                    totalRow['payment'] += debtAccountsInfo[key]['balance'];

                    debtAccountsInfo[key]['balance'] = 0;

                } else {
                    //paying the account as normal
                    debtAccountsInfo[key]['balance'] -=  paymentTotal

                    //inputting the payment data
                    templateRow['payment'] = general.formatIntoCurrency(paymentTotal);
                    totalRow['payment'] += paymentTotal;

                }

                console.log(key + '-payment: ' + String(Math.round(paymentTotal)));
                console.log(key + '-leftoverMonthlyPayment: ' + String(Math.round(leftoverMonthlyPayment)));

                
            } else {

                //calculating our full payment. here we exclude the total leftover amount because that will only
                //be used for our first account
                paymentTotal = debtAccountsInfo[key]['minPayment'] + leftoverMonthlyPayment;

                //checking if we will be paying off the account
                if (debtAccountsInfo[key]['balance'] <= paymentTotal) {
                    debtAccountsInfo[key]['paid'] = true;
                    leftoverMonthlyPayment = paymentTotal - debtAccountsInfo[key]['balance'];
                    templateRow['payment'] = general.formatIntoCurrency(debtAccountsInfo[key]['balance']);
                    totalRow['payment'] += debtAccountsInfo[key]['balance'];
                    debtAccountsInfo[key]['balance'] = 0;
                    

                } else {
                    //paying the account as normal
                    debtAccountsInfo[key]['balance'] -=  paymentTotal
                    templateRow['payment'] = general.formatIntoCurrency(paymentTotal)
                    totalRow['payment'] += paymentTotal;
                }

                
            }

            //if we used leftover funds we reset it back to 0
            if (leftoverFunds) {
                leftoverMonthlyPayment = 0;
                console.log('used leftover funds!')
            }
            
            //adding the data to our table for the account inself
            templateRow['balance'] = general.formatIntoCurrency(debtAccountsInfo[key]['balance']);

            //adding the data for the monthly total
            totalRow['balance'] += debtAccountsInfo[key]['balance'];

            //adding the data for the line graph
            chartAccountData[key].data.push(Math.round(debtAccountsInfo[key]['balance']))

            accountOrder++;

            //update account as paid then move funds to next account
            //ensure to update the totalLeftoverAmount by the minimum payment by the account that was paid off. 
            console.log(key + '-balance: ' + String(Math.floor(debtAccountsInfo[key]['balance'])));
            
            //adding row data for table
            rowData.push(templateRow);

        }

        //updating the total debt amount
        totalDebt = 0;
        for (let key in debtAccountsInfo) {
            totalDebt += debtAccountsInfo[key]['balance'];
        }

        //adding data for line graph
        chartMonthsStorage.push(month);
        chartAccountData['Interest'].data.push(
            Math.round(totalRow['interest'])
        );


        month++;

        //updating the format be adding to the table data
        totalRow['interest'] = general.formatIntoCurrency(totalRow['interest']);
        totalRow['payment'] = general.formatIntoCurrency(totalRow['payment']);
        totalRow['balance'] = general.formatIntoCurrency(totalRow['balance']);

        rowData.push(totalRow);

        if (month > 120) {
            console.log("Hit 120 months! You finna be broke forevs!");
            break;
        }

        console.log('total debt: ' + String(Math.round(totalDebt)));
        console.log('---');
        
    }

    //decrementing to not count the last month after the balances are paid off since the loop runs one more time
    month--;

    //create pointers to each header
    const debtFreeDate = document.getElementById('debtFreeDate');
    const debtMonthsFromToday = document.getElementById('debtMonthsFromToday');
    const debtTotalInterestPaid = document.getElementById('debtTotalInterestPaid');

    //insert data
    debtMonthsFromToday.innerHTML = month;
    debtTotalInterestPaid.innerHTML = general.formatIntoCurrency(totalInterestPaid);

    //calculating the date to enter
    const today = new Date();
    today.setMonth(today.getMonth() + month);

    const year = today.getFullYear();
    const debtFreeMonth = String(today.getMonth() + 1).padStart(2, '0');

    const formattedDate = `${debtFreeMonth}-${year}`;

    debtFreeDate.innerHTML = formattedDate;

    //adding the content to our table dictionary
    const gridOptions = {
        theme: myTheme,
        columnDefs,
        rowData,
        defaultColDef
        };

    //creating the table
    debtGridApi = createGrid(document.querySelector("#debtGrid"), gridOptions);

    //starting the process for the line graph

    //adding each account we will need for our datasets
    for (let key in chartAccountData) {
        chartInputArray.push(chartAccountData[key]);
    }

    const ctx = document.getElementById('debtLineGraph').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartMonthsStorage,
            datasets: chartInputArray
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Account Balances and Interest',
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
                        text: 'Month',
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

function sortAccountsByProperty(debtAccountsInfo, property, ascending = true) {
    const sortedEntries = Object.entries(debtAccountsInfo)
      .sort((a, b) => {
        return ascending ? 
          a[1][property] - b[1][property] : 
          b[1][property] - a[1][property];
      });
    
    return Object.fromEntries(sortedEntries);
  }
  







