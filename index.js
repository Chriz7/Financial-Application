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

//variables to use for our investment accounts page
let numberOfInvestmentAccounts = 1;

// Function to clear and update mainContentInformationBox content
function mainContentInitiation(title) {
    mainContentInformationBox.innerHTML = 
        `<div id="MainContentTitleBox"> 
            <p id="MainContentTitle">${title}</p> 
        </div>`;
}

/* Function to create a retirement table
function generateRetirementTable() {

    //ensuring we have numbers entered
    if (isNaN(startAmount) || isNaN(contribution)) {
    alert("Please enter valid numbers.");
    }

    //tr is a table row
    //th is a table header
    //td is a cell. think table data
    //{variableName} will insert a variable.
    let html = `
    <table>
        <tr>
            <th>Year</th>
            <th>Contribution</th>
            <th>Starting Balance</th>
            <th>Interest Earned</th>
            <th>Ending Balance</th>
        </tr>
    `;

    //creating variables to update each year
    let balance = startAmount;
    let currentContribution = contribution;
    let contributionLimit = 23500; //as of 2025

    //assuming a 7% real annual return rate of the market
    const rate = .07;

    for (let year = 1; year <= 30; year++) {

        balance += currentContribution;
        const interest = balance * rate;
        const endBalance = balance + interest;

        html += `
            <tr>
                <td>${year}</td>
                <td>${Math.round(currentContribution)}</td>
                <td>$${Math.round(balance)}</td>
                <td>$${Math.round(interest)}</td>
                <td>$${Math.round(endBalance)}</td>
            </tr>`;

        //checking our potential contribution for the year
        const potenialContribution = currentContribution + yearlyIncrease;

        //if we are higher or equal to the contribution limit we contribute the max otherwise increase by 1%
        if (potenialContribution >= contributionLimit) {
            currentContribution = contributionLimit;
        } else { 
            currentContribution = potenialContribution;
        }

        balance = endBalance;
        contributionLimit += 500;
    }

    //closing the table tag. this will be the final piece of the HTML we will need for our table
    html += `</table>`;

    //inserting the table into our retirementTable div
    mainContentTableBox.innerHTML = html;

    };
*/

//adds an investment account to the mainContentBox. This is so the user can manage multiple investment accounts
function addInvestmentAccount() {
    mainContentInformationBox.innerHTML +=
        `<div class = "investmentInputsBox" id = investmentAccount${numberOfInvestmentAccounts}>
            <button class = "removeInvestmentAccount">-</button>
            <label>Name <input class="investmentInput" value="Account ${numberOfInvestmentAccounts}"></label>
            <label>Balance ($) <input type="number" value="0" class="investmentInput"></label>
            <label>Yearly contribution ($) <input type="number" value="0" class="investmentInput"></label>
            <label>Yearly increase ($) <input type="number" value="0" class="investmentInput"></label>
            <label>Yearly return rate (%) <input type="float" value="0" class="investmentInput"></label>
        </div>`;
    numberOfInvestmentAccounts ++;
}

// Event listener for Invest shortcut button (renders the investment content)
investShortcutBtn.addEventListener("click", function () {
    mainContentInitiation('Investments');

    document.getElementById("MainContentTitleBox").innerHTML += 
    '<button id="addInvestmentAccount">Add Account</button>';
    
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
});

// Event listener for Budget button (renders budget content)
budgetShortcutBtn.addEventListener("click", function () {
    mainContentInitiation(`
        <p>Budgeting Tools Coming Soon...</p>
    `, 'Budgeting');
});

// Event listener for Pay Debt button (renders debt content)
debtShortcutBtn.addEventListener("click", function () {
    mainContentInitiation(`
        <p>Debt Management Strategies Coming Soon...</p>
    `, 'Tackling Debt');
});

// Event listener for Learn button (renders education content)
educationShortcutBtn.addEventListener("click", function () {
    mainContentInitiation(`
        <p>Financial Education Resources Coming Soon...</p>
    `, 'Financial Education');
});
