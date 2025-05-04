import * as general from './index.js';



export function setupBudgetShortcutListener (budgetShortcutBtn) {

    budgetShortcutBtn.addEventListener ('click', function(){

        general.clearContainers();

        //adding title
        general.mainContentInitiation('Monthly Budget');

        //adding info button and calculate button
        general.introContainer.insertAdjacentHTML('beforeend', 
            `<div class="icon-container">
                    <p class="icon"> i </p>
                        <div class="hover-box">
                            <p class="instructionsText">Instructions:</p> 
                            <ol class="instructionsText">
                                <li>Enter your income. This is money coming in.</li><br>
                                <li>Enter your savings. This is money you are setting aside for the future. Remember to pay yourself first!</li><br>
                                <li>Enter your needs. These are the things you NEED to live every month.</li><br>
                                <li>Enter your wants. These are extra things in life you would like to have.</li><br>
                                <li>Review your allocations using "Summary" section.</li>

                                </ol>
                        </div>
            </div>
            `
        );

        general.pageContentContainer.insertAdjacentHTML('beforeend',
            `
            <div class = 'masterBudgetContainer'>
                <div class="incomeSavingsContainer budgetCategoryContainer">
                        
                        <div class = 'budgetTopicContainer'>

                            <div class = 'budgetHeaderContainer'>
                                <p class = budgetTopicTitle> Income </p>
                                <button class = 'controlButton' id="addIncomeAccount">Add Income</button>
                                <div class = 'budgetTotalContainer'>
                                    <p class = budgetTopicTitle> Total: $</p>
                                    <p id = budgetIncomeTotal>0</p>
                                </div>
                            </div>

                            <div class = 'budgetTableContainer'>
                                <table class = 'budgetTable'>
                                    <colgroup>
                                        <col style="width: 10%;">
                                        <col style="width: 45%;">
                                        <col style="width: 45%;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Amount</th>                                        
                                        </tr>
                                    </thead>
                                        <tbody id='budgetIncomeTable'>
                                            <tr>
                                                <td>
                                                    <div class="removeButtonContainer">
                                                        <button class="removeAccount">-</button>
                                                    </div>
                                                </td>
                                                <td contenteditable="true">Salary</td>
                                                <td contenteditable="true">3500</td>
                                            </tr>
                                        </tbody>                                    
                                </table>
                            </div>
                            
                        </div>

                        <div class = 'budgetTopicContainer'>
                            <div class = 'budgetHeaderContainer'>
                                <p class = budgetTopicTitle> Needs </p>
                                <button class = 'controlButton' id="addNeedAccount">Add Account</button>
                                <div class = 'budgetTotalContainer'>
                                    <p class = budgetTopicTitle> Total: $</p>
                                    <p id = budgetNeedTotal>0</p>
                                </div>
                            </div>

                            <div class = 'budgetTableContainer'>
                                <table class = 'budgetTable'>
                                    <colgroup>
                                        <col style="width: 10%;">
                                        <col style="width: 45%;">
                                        <col style="width: 45%;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Amount</th>                                        
                                        </tr>
                                    </thead>
                                    <tbody id='budgetNeedTable'>
                                        <tr>
                                            <td> <div class="removeButtonContainer"> <button class="removeAccount">-</button> </div> </td>
                                            <td>Rent</td>
                                            <td>1500</td>
                                        </tr>
                                        <tr>
                                            <td> <div class="removeButtonContainer"> <button class="removeAccount">-</button> </div> </td>
                                            <td>Groceries</td>
                                            <td>500</td>
                                        </tr>
                                        <tr>
                                            <td> <div class="removeButtonContainer"> <button class="removeAccount">-</button> </div> </td>
                                            <td>Electric</td>
                                            <td>100</td>
                                        </tr>
                                        <tr>
                                            <td> <div class="removeButtonContainer"> <button class="removeAccount">-</button> </div> </td>
                                            <td>Phone</td>
                                            <td>80</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </div>
                
                <div class="budgetCategoryContainer">

                    <div class = 'budgetTopicContainer'>
                            <div class = 'budgetHeaderContainer'>
                                <p class = budgetTopicTitle> Savings </p>
                                <button class = 'controlButton' id="addSavingAccount">Add Savings</button>
                                <div class = 'budgetTotalContainer'>
                                    <p class = budgetTopicTitle> Total: $</p>
                                    <p id = budgetSavingTotal>0</p>
                                </div>
                            </div>

                            <div class = 'budgetTableContainer'>
                                <table class = 'budgetTable'>
                                    <colgroup>
                                        <col style="width: 10%;">
                                        <col style="width: 45%;">
                                        <col style="width: 45%;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Amount</th>                                        
                                        </tr>
                                    </thead>
                                    <tbody id='budgetSavingTable'>
                                        <tr>
                                            <td> <div class="removeButtonContainer"> <button class="removeAccount">-</button> </div> </td>
                                            <td>401K</td>
                                            <td>500</td>
                                        </tr>
                                        <tr>
                                            <td> <div class="removeButtonContainer"> <button class="removeAccount">-</button> </div> </td>
                                            <td>Emergency Fund</td>
                                            <td>200</td>
                                        </tr>
                                        <tr>
                                            <td> <div class="removeButtonContainer"> <button class="removeAccount">-</button> </div> </td>
                                            <td>Vacation</td>
                                            <td>100</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class = 'budgetTopicContainer'>
                            <div class = 'budgetHeaderContainer'>
                                <p class = budgetTopicTitle> Wants </p>
                                <button class = 'controlButton' id="addWantAccount">Add Account</button>
                                <div class = 'budgetTotalContainer'>
                                    <p class = budgetTopicTitle> Total: $</p>
                                    <p id = budgetWantTotal>0</p>
                                </div>
                            </div>

                            <div class = 'budgetTableContainer'>
                                <table class = 'budgetTable'>
                                    <colgroup>
                                        <col style="width: 10%;">
                                        <col style="width: 45%;">
                                        <col style="width: 45%;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Amount</th>                                        
                                        </tr>
                                    </thead>
                                    <tbody id='budgetWantTable'>
                                        <tr>
                                            <td> <div class="removeButtonContainer"> <button class="removeAccount">-</button> </div> </td>
                                            <td>Eating Out</td>
                                            <td>200</td>
                                        </tr>
                                        <tr>
                                            <td> <div class="removeButtonContainer"> <button class="removeAccount">-</button> </div> </td>
                                            <td>Subscriptions</td>
                                            <td>50</td>
                                        </tr>
                                        <tr>
                                            <td> <div class="removeButtonContainer"> <button class="removeAccount">-</button> </div> </td>
                                            <td>Gym</td>
                                            <td>30</td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>

                </div>

                <div class="summaryContainer budgetCategoryContainer">

                    <div class = 'budgetTopicContainer'>
                        <div class = 'topicContainer'>
                            <p class = budgetTopicTitle id = 'summaryBudgetTitle'>Summary</p>
                            <div class = 'budgetSummaryChartContainer'>
                                <canvas id="summaryChart">
                                </canvas>
                            </div>
                        </div>

                        <div class = 'topicContainer'>
                            <table class = 'budgetTable'>
                                    <colgroup>
                                        <col style="width: 60%;">
                                        <col style="width: 20%;">
                                        <col style="width: 20%;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Total</th>
                                            <th>% of Income</th>                                        
                                        </tr>
                                    </thead>
                                    <tbody id='budgetSummaryTable'>
                                        <tr>
                                            <td>Savings</td>
                                            <td id = 'summarySavingTotal'></td>
                                            <td id = 'summarySavingPercentage'></td>
                                        </tr>
                                        <tr>
                                            <td>Needs</td>
                                            <td id = 'summaryNeedTotal'></td>
                                            <td id = 'summaryNeedPercentage'></td>
                                        </tr>
                                        <tr>
                                            <td>Wants</td>
                                            <td id = 'summaryWantTotal'></td>
                                            <td id = 'summaryWantPercentage'></td>
                                        </tr>
                                        <tr>
                                            <td>Leftover</td>
                                            <td id = 'summaryLeftoverTotal'></td>
                                            <td id = 'summaryLeftoverPercentage'></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                        </div>
                    </div>

                </div>
            </div>
            `

        );

        //ensuring all the cells in the table are editable
        document.querySelectorAll('.budgetTable td').forEach(cell => {
            cell.setAttribute('contenteditable', 'true');
        });

        updateSummaryTable();
        initializeDoughnutChart();

        //setting up a general lister function
        //here we can set up custom event listners inside our Page Content Container
        general.pageContentContainer.addEventListener("click", function (event) {

            if (event.target.id === "addIncomeAccount") {
                addRowToTable("budgetIncomeTable");
                }

            else if (event.target.id === "addNeedAccount") {
                addRowToTable("budgetNeedTable");
                }

            else if (event.target.id === "addSavingAccount") {
                addRowToTable("budgetSavingTable");
                }

            else if (event.target.id === "addWantAccount") {
                addRowToTable("budgetWantTable");
                }

            //triggers if the button we clicked has the class removeButton
            if (event.target.classList.contains("removeAccount")) {

                // Finding the table row when the button resides
                const tableRow = event.target.closest('tr');
                
                //remove the row
                tableRow.remove();

                updateSummaryTable();
                initializeDoughnutChart();
    
            }

        });

        // Add this event listener to your table
        general.pageContentContainer.addEventListener('input', function(event) {
            // Check if the input occurred within a table cell (td)
            const cell = event.target.closest('td');
            
            // Find the parent table or tbody
            const table = cell.closest('tbody, table');
            
            // Get the ID of the table or tbody
            const tableID = table.id;
            
            // Call your sum functions with the table ID
            let total = updateTableTotal(tableID);

            //initiating a pointer
            let tableSum;

            //seeing which total our table id points by setting up a switch statement
            switch (tableID) {
                case  'budgetIncomeTable':
                    tableSum = document.getElementById('budgetIncomeTotal');
                    break;
                    
                case 'budgetNeedTable':
                    tableSum = document.getElementById('budgetNeedTotal');
                    break;

                case 'budgetSavingTable':
                    tableSum = document.getElementById('budgetSavingTotal');
                    break;

                case 'budgetWantTable':
                    tableSum = document.getElementById('budgetWantTotal');
                    break;
              }
            
            //updating the total based on our which total our switch statement returns
            tableSum.innerHTML = total;

            updateSummaryTable();
            initializeDoughnutChart();
        });

    });

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
     <td contenteditable="true">0</td>
    `;

    table.appendChild(newRow);
}

function updateTableTotal(tableId) {

    // Get the table body element
    const tableBody = document.getElementById(tableId);
    
    // Initialize the total
    let total = 0;
    
    // Loop through all rows in the table
    const rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        
        // Get the cells in the current row
        const cells = rows[i].getElementsByTagName('td');
        
        // Get the text content of the 3rd cell (index 2)
        const valueText = cells[2].textContent.trim();
        
        // Convert to number and add to total if it's a valid number
        const value = parseFloat(valueText);
        if (!isNaN(value)) {
            total += value;
        }
        
    }
    
    return total;
}

let needTotal;
let savingTotal;
let wantTotal;
let leftoverTotal;

function updateSummaryTable () {
    //initializing the category totals
    //income
    let incomeTotal = updateTableTotal('budgetIncomeTable');
    document.getElementById('budgetIncomeTotal').innerHTML = incomeTotal;

    //Needs
    needTotal = updateTableTotal('budgetNeedTable'); //sums the values in the table
    document.getElementById('budgetNeedTotal').innerHTML = needTotal; //updates the total in the header
    document.getElementById('summaryNeedTotal').innerHTML = needTotal; //updates the total in the summary table
    let needPercentage = Math.trunc((needTotal / incomeTotal) * 100); //calculating the percentage of the income
    document.getElementById('summaryNeedPercentage').innerHTML = needPercentage.toString() + '%'; //adding the % to summary table

    //Savings
    savingTotal = updateTableTotal('budgetSavingTable');
    document.getElementById('budgetSavingTotal').innerHTML = savingTotal;
    document.getElementById('summarySavingTotal').innerHTML = savingTotal;
    let savingPercentage = Math.trunc((savingTotal / incomeTotal) * 100)
    document.getElementById('summarySavingPercentage').innerHTML =  savingPercentage.toString() + '%';

    //Wants
    wantTotal = updateTableTotal('budgetWantTable');
    document.getElementById('budgetWantTotal').innerHTML = wantTotal;
    document.getElementById('summaryWantTotal').innerHTML = wantTotal;
    let wantPercentage = Math.trunc((wantTotal / incomeTotal) * 100)
    document.getElementById('summaryWantPercentage').innerHTML = wantPercentage.toString() + '%';

    //Leftover
    leftoverTotal = incomeTotal - needTotal - savingTotal - wantTotal
    document.getElementById('summaryLeftoverTotal').innerHTML = leftoverTotal;
    let leftoverPercentage = Math.trunc((leftoverTotal / incomeTotal) * 100);
    document.getElementById('summaryLeftoverPercentage').innerHTML = leftoverPercentage.toString() + '%';

    initializeDoughnutChart();
}

function initializeDoughnutChart() {
    // Get the canvas element where the chart will be rendered
    const chartCanvas = document.getElementById('summaryChart');

    // Check if a chart instance already exists and destroy it
    if (window.myDoughnutChart) {
        window.myDoughnutChart.destroy();
    }
    
    // Create a new Chart instance
    window.myDoughnutChart = new Chart(chartCanvas, {
        type: 'doughnut',
        data: updateDoughnutChart(),
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Monthly Budget Overview'
                }
            }
        }
    });
}

function updateDoughnutChart() {
    const doughnutData = {
        labels: [
          'Needs',
          'Savings', 
          'Wants', 
          'Leftover'
        ],
        datasets: [{
          data: [needTotal, savingTotal, wantTotal, leftoverTotal],
          backgroundColor: [
            'rgb(44, 132, 190)',
            'rgb(20, 160, 27)',
            'rgb(112, 15, 136)', 
            'rgb(211, 136, 24)', 
          ],
          hoverOffset: 4
        }]
      };
    
    return doughnutData
}


