import * as investments from './investments.js';
import * as home from './home.js';




// Get references to buttons, dynamic content containers, and the graph container

//pointer to main content box
const projectionsContainer = document.getElementById("projectionsContainer");
export const introContainer = document.querySelector(".introContainer");
export const pageContentContainer = document.querySelector(".pageContentContainer");



//pointers to shourtcut buttons
const homeShortcutBtn = document.getElementById("homeShortcut");
const budgetShortcutBtn = document.getElementById("budgetShortcut");
const debtShortcutBtn = document.getElementById("debtShortcut");
const educationShortcutBtn = document.getElementById("educationShortcut");
const investShortcutBtn = document.getElementById("investShortcut");


// Function to clear the intro and page content Container in preparation for HTML injection
export function clearContainers() {
    introContainer.innerHTML = ``;
    pageContentContainer.innerHTML = ``;
}


// Function to clear and update page title
function mainContentInitiation(title) {
    introContainer.innerHTML = 
        `<p id="MainContentTitle">${title}</p> `;
}


export function formatIntoCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

//this code will execute when the shortcuts buttons are clicked
investments.setupInvestmentShortcutListener(investShortcutBtn, mainContentInitiation);
home.setupHomeShortcutListener(homeShortcutBtn);

homeShortcutBtn.click();

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
