import * as investments from './investments.js';
import * as home from './home.js';
import * as budget from './budget.js';


// Get references to buttons, dynamic content containers, and the graph container

//pointer to main content containers
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
export function mainContentInitiation(title) {
    introContainer.innerHTML = 
        `<p class="MainContentTitle">${title}</p> `;
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
investments.setupInvestmentShortcutListener(investShortcutBtn);
home.setupHomeShortcutListener(homeShortcutBtn);
budget.setupBudgetShortcutListener(budgetShortcutBtn);

homeShortcutBtn.click();

