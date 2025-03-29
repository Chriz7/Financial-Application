

import { createGrid, themeQuartz} from './imports.js';
// Get references to buttons, dynamic content containers, and the graph container

//pointer to main content box
const mainContentInformationBox = document.getElementById("mainContentInformationBox");
const mainContentTitle = document.getElementById("MainContentTitle");
const mainContentTableBox = document.getElementById("mainContentTableBox");


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

    mainContentInformationBox.innerHTML += 
        `<div class = "investmentInputsBox" id = "accountID${numberOfInvestmentAccounts}">
            <button class = "removeInvestmentAccount">-</button>
            <label>Name <input class="investmentInput" value="Account ${numberOfInvestmentAccounts}"></label>
            <label>Balance ($) <input type="number" value="0" class="investmentInput"></label>
            <label>Yearly contribution ($) <input type="number" value="0" class="investmentInput"></label>
            <label>Yearly increase ($) <input type="number" value="0" class="investmentInput"></label>
            <label>Yearly return rate (%) <input type="float" value="0" class="investmentInput"></label>
        </div>`;

    numberOfInvestmentAccounts ++;
}

// New function to collect and store all investment account data
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

//this function will gather the investment account data and create at table
function calculateInvesmentTable() {

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
        const columnDefs = [{ field: "year" }, { field: "account" }, { field: "startingBalance" }, { field: "contributions" }, { field: "interestGained" }, { field: "endingBalance" }];

        //creating the shell for our our row level data
        const rowData = [];

        const defaultColDef = {
          flex: 1,
          minWidth: 100
        };
        
        const yearsToProject = 30;

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
                templateRow['startingBalance'] = Math.ceil(accountInformation['startingBalance']);

                //handling contributions
                templateRow['contributions'] = accountInformation['yearlyContribution'];

                //handling interest gained
                const interestGained = (accountInformation['startingBalance'] + accountInformation['yearlyContribution']) * accountInformation['returnRate']
                templateRow['interestGained'] = Math.ceil(interestGained);

                //handling ending balance
                templateRow['endingBalance'] = Math.ceil(accountInformation['startingBalance'] + interestGained + accountInformation['yearlyContribution']);

                //pushing our data to be adding to the table
                rowData.push(templateRow);

                //updating our data for next year
                accountInformation['startingBalance'] = templateRow['endingBalance']
                accountInformation['yearlyContribution'] += accountInformation['yearlyIncrease']

                //before moving onto the next account be sure to add the totals to the yearly sum
                startingBalanceYearTotal += templateRow['startingBalance'];
                contributionYearTotal += templateRow['contributions'];
                interestGainedYearTotal += templateRow['interestGained'];
                endingBalanceYearTotal += templateRow['endingBalance'];
            }

            //do a total row addition here

            templateRow = {year: "Year " + year + ": Total", startingBalance: Number(startingBalanceYearTotal), contributions: contributionYearTotal, interestGained: Number(interestGainedYearTotal), endingBalance: Number(endingBalanceYearTotal)};
            rowData.push(templateRow);
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

    document.getElementById("MainContentTitleBox").innerHTML += 
    '<button id="addInvestmentAccount">Add Account</button> <button id="calculateInvestments">Calculate</button>';

    //resetting our number back to 1
    numberOfInvestmentAccounts = 1;
    
});

// Attach event listener for the add account button. this added it to the parent container so we dont have to worry about reattaching it when we clear the contents
mainContentInformationBox.addEventListener("click", function (event) {
    

    //triggers if the button we clicked has the class removeButton
    if (event.target.classList.contains("removeInvestmentAccount")) {
        // Find the parent div of the button (the investment account div)
        const investmentAccountDiv = event.target.closest('.investmentInputsBox');
        
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

    mainContentTableBox.innerHTML = ``;
    
});

// Event listener for Pay Debt button (renders debt content)
debtShortcutBtn.addEventListener("click", function () {
    mainContentInitiation(`
        <p>Debt Management Strategies Coming Soon...</p>
    `, 'Tackling Debt');

    mainContentTableBox.innerHTML = ``;
    
});

// Event listener for Learn button (renders education content)
educationShortcutBtn.addEventListener("click", function () {
    mainContentInitiation(`
        <p>Financial Education Resources Coming Soon...</p>
    `, 'Financial Education');

    mainContentTableBox.innerHTML = ``;
    
});
