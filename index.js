// Get references to buttons, dynamic content containers, and the graph container

//pointer to main content box
const mainContentInformationBox = document.getElementById("mainContentInformationBox");
const mainContentTitle = document.getElementById("MainContentTitle");

//pointers to shourtcut buttons
const budgetShortcutBtn = document.getElementById("budgetShortcut");
const debtShortcutBtn = document.getElementById("debtShortcut");
const educationShortcutBtn = document.getElementById("educationShortcut");
const investShortcutBtn = document.getElementById("investShortcut");

//pointers regarding the investment page
const retirementInputs = document.getElementById("retirementInputs");
const retirementTable = document.getElementById("retirementTable");

// Function to clear and update mainContentInformationBox content
function insertIntoMainContent(contentHTML, title) {
    mainContentInformationBox.innerHTML = `
        <div id="MainContentTitleBox"> 
            <p id="MainContentTitle">${title}</p> 
        </div>
        ${contentHTML}
    `;
}

// Function to create a retirement table
function generateRetirementTable() {

    //.value grabs the value from that element and parsefloat cast it to a float
    const startAmount = parseInt(document.getElementById("startAmount").value);
    const contribution = parseInt(document.getElementById("contribution").value);
    const yearlyIncrease = parseInt(document.getElementById("yearlyIncrease").value);

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
    document.getElementById("retirementTable").innerHTML = html;
    };


// Event listener for Invest shortcut button (renders the retirement inputs & table container)
investShortcutBtn.addEventListener("click", function () {
    insertIntoMainContent(`
        <div id="retirementInputs">
            <label>Balance ($): <input type="number" id="startAmount" value="55000" class="retirementInput"></label><br>
            <label>Yearly contribution ($): <input type="number" id="contribution" value="15600" class="retirementInput"></label><br>
            <label>Yearly increase amount ($): <input type="number" id="yearlyIncrease" value="600" class="retirementInput"></label><br>
            <button id="generateRetirementBtn" class="retirementInput">Generate Table</button>
        </div>
        <div id="retirementTable"></div>
    `, 'Investments');

    // Reattach event listener for the Generate Table button
    document.getElementById("generateRetirementBtn").addEventListener("click", generateRetirementTable);
});

// Event listener for Budget button (renders budget content)
budgetShortcutBtn.addEventListener("click", function () {
    insertIntoMainContent(`
        <p>Budgeting Tools Coming Soon...</p>
    `, 'Budgeting');
});

// Event listener for Pay Debt button (renders debt content)
debtShortcutBtn.addEventListener("click", function () {
    insertIntoMainContent(`
        <p>Debt Management Strategies Coming Soon...</p>
    `, 'Tackling Debt');
});

// Event listener for Learn button (renders education content)
educationShortcutBtn.addEventListener("click", function () {
    insertIntoMainContent(`
        <p>Financial Education Resources Coming Soon...</p>
    `, 'Financial Education');
});
