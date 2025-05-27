import * as home from './home.js';

// Get references to buttons, dynamic content containers, and the graph container

//pointer to main content containers
export const introContainer = document.querySelector(".introContainer");
export const pageContentContainer = document.querySelector(".pageContentContainer");

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


const homeShortcutBtn = document.getElementById("homeShortcut");
home.setupHomeShortcutListener(homeShortcutBtn);
homeShortcutBtn.click();



