

const { createGrid, AllCommunityModule, ModuleRegistry, themeQuartz } = window.agGrid;

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

// Get references to buttons, dynamic content containers, and the graph container

//pointer to main content box
const mainContentInformationBox = document.getElementById("mainContentInformationBox");
const projectionsContainer = document.getElementById("projectionsContainer");


//pointers to shourtcut buttons
const budgetShortcutBtn = document.getElementById("budgetShortcut");
const debtShortcutBtn = document.getElementById("debtShortcut");
const educationShortcutBtn = document.getElementById("educationShortcut");
const investShortcutBtn = document.getElementById("investShortcut");

//invesment variables
let numberOfInvestmentAccounts = 1;

//dictionary to store investment account information
const investmentAccounts = {};

// Function to clear and update mainContentInformationBox content
function mainContentInitiation(title) {
    mainContentInformationBox.innerHTML = 
        `<div id="MainContentTitleBox">
            <p id="MainContentTitle">${title}</p> 
        </div>`;
}

//adds an investment account to the mainContentBox. This is so the user can manage multiple investment accounts
function addInvestmentAccount() {

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
                <input id="yearlyRateInput" type="float" value="0" class="investmentInput">
            </label>
        </div>
        
    `;

    // Append the new account div to the container without clearing existing content
    // Using += will cause the webpage to be rerendered which will clear the entered content
    mainContentInformationBox.appendChild(accountDiv);

    numberOfInvestmentAccounts ++;
}

// collect and store all investment account data
function updateInvestmentDictionary() {
    
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

function formatIntoCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

//this function will gather the investment account data and create at table
function calculateInvesmentTable() {

    const mainContentTableBox = document.getElementById("mainContentTableBox");

    mainContentTableBox.innerHTML = 
        `<div id="myGrid"></div>`;

        let gridApi;

        //creating the theme for our output table
        const myTheme = themeQuartz
            .withParams({
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

        const yearsToProject = document.getElementById("yearsInput").value;

        //iterating through each year for the projection
        for (let year = 1; year <= yearsToProject; year++) {

            //creating our row shell. this will refresh at every iteration
            let templateRow = {year: year.toString(), account: 'test' , startingBalance: 0, contributions: 0, interestGained: 0, endingBalance: 0};

            let startingBalanceYearTotal = 0;
            let contributionYearTotal = 0;
            let interestGainedYearTotal = 0;
            let endingBalanceYearTotal = 0;

            //iterating through each account we have
            for (let [accountID, accountInformation] of Object.entries(investmentAccounts))
            {

                //also refreshing our template row here to prepare for the next account
                let templateRow = {year: year.toString(), account: 'test', startingBalance: 0, contributions: 0, interestGained: 0, endingBalance: 0};

                //handling the account name
                templateRow['account'] = accountInformation['name'];

                //handling starting balance
                let startingBalanceCalcuation = Math.ceil(accountInformation['startingBalance']);
                templateRow['startingBalance'] = formatIntoCurrency(startingBalanceCalcuation);

                //handling contributions
                let contributionTableValue = accountInformation['yearlyContribution'];
                templateRow['contribution'] = formatIntoCurrency(contributionTableValue);

                //handling interest gained
                const interestGained = (startingBalanceCalcuation + accountInformation['yearlyContribution']) * accountInformation['returnRate']
                templateRow['interestGained'] = formatIntoCurrency(Math.ceil(interestGained));

                //handling ending balance
                let endingBalanceCalculation = Math.ceil(startingBalanceCalcuation + interestGained + accountInformation['yearlyContribution']);
                templateRow['endingBalance'] = formatIntoCurrency(endingBalanceCalculation);

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
                contributions: formatIntoCurrency(contributionYearTotal), 
                interestGained: formatIntoCurrency(interestGainedYearTotal), 
                endingBalance: formatIntoCurrency(endingBalanceYearTotal)};
                
            rowData.push(templateRow);

            
            if (year == 1) {
                //resetting the original value then adding the value of the starting portfolio value
                document.getElementById("startingPortfolioValue").innerHTML = '';
                document.getElementById("startingPortfolioValue").innerHTML = formatIntoCurrency(startingBalanceYearTotal);
            } else if (year == yearsToProject) {
                //resetting the original value then adding the final value of the portfolio
                document.getElementById("endingPortfolioValue").innerHTML = '';
                document.getElementById("endingPortfolioValue").innerHTML = formatIntoCurrency(endingBalanceYearTotal);
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
        gridApi = createGrid(document.querySelector("#myGrid"), gridOptions);

}

// Event listener for Invest shortcut button (renders the investment content)
investShortcutBtn.addEventListener("click", function () {
    mainContentInitiation('Investments');

    //adding the information hover text
    document.getElementById("MainContentTitleBox").innerHTML += 
    `        
        <button id="addInvestmentAccount">Add Account</button> 
        <button id="calculateInvestments">Calculate</button>
        <div class="icon-container">
            <p class="icon"> i </p> 
            <div class="hover-box">
                <p class="instructionsText">Instructions:</p> 
                <ol class="instructionsText">
                    <li>Enter your investment accounts using the green "Add Account" button.</li><br>
                    <li>Enter the number of years you would like to project your portfolio to grow.</li><br>
                    <li>Click the green "Calculate" button then watch your money work for you!</li>
                </ol>
                <p>For mobile, tab outside the help box to close.</p> 
            </div>
        </div> 
    `;

    //resetting our number back to 1
    numberOfInvestmentAccounts = 1;

    //adding the portfolio headers and the container for the projection table
    projectionsContainer.innerHTML = `
        <div id="projectionHeaders">
            
            <div class="projectionHeader">
                <label>Years to project <input type="number" value="0" id="yearsInput"></label>
            </div>
        
            <div class="projectionHeader">
                <p>Starting Portfolio Value</p>
                <p id="startingPortfolioValue"> </p>
            </div>

            <div class="projectionHeader">
                <p>Final Portfolio Value</p>
                <p id="endingPortfolioValue"> </p>
            </div>
        </div>

        <div id="mainContentTableBox">
        </div>
        `;

});

// Attach event listener for the add account button. this added it to the parent container so we dont have to worry about reattaching it when we clear the contents
mainContentInformationBox.addEventListener("click", function (event) {
    

    //triggers if the button we clicked has the class removeButton
    if (event.target.classList.contains("removeInvestmentAccount")) {
        // Find the parent div of the button (the investment account div)
        const investmentAccountDiv = event.target.closest('.investmentBox');
        
        // Remove the parent div from the DOM
        investmentAccountDiv.remove();
    }
    
    if (event.target.id === "addInvestmentAccount") {
        addInvestmentAccount();
    }

    if (event.target.id === "calculateInvestments") {
        updateInvestmentDictionary();
        calculateInvesmentTable();
    }
});

// Event listener for Budget button (renders budget content)
budgetShortcutBtn.addEventListener("click", function () {
    mainContentInitiation(`
        <p>Budgeting Tools Coming Soon...</p>
    `, 'Budgeting');

    projectionsContainer.innerHTML = ``;
    
});

// Event listener for Pay Debt button (renders debt content)
debtShortcutBtn.addEventListener("click", function () {
    mainContentInitiation(`
        <p>Debt Management Strategies Coming Soon...</p>
    `, 'Tackling Debt');

    projectionsContainer.innerHTML = ``;
    
});

// Event listener for Learn button (renders education content)
educationShortcutBtn.addEventListener("click", function () {
    mainContentInitiation(`
        <p>Financial Education Resources Coming Soon...</p>
    `, 'Financial Education');

    projectionsContainer.innerHTML = ``;
    
});
