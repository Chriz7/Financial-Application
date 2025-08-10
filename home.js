import * as general from './index.js';
import * as investments from './investments.js';
import * as budget from './budget.js';
import * as debt from './debt.js';
import * as education from './education.js';

let homeEventsLoaded = false;

export function setupHomeShortcutListener (homeShortcutBtn) {

    homeShortcutBtn.addEventListener ('click', function(){

        general.clearContainers();

        //redering the intro title
        general.introContainer.insertAdjacentHTML('beforeend', 
                    `<p class = 'pageIntroTitle brightTitle'>Welcome to Financial Compass - let's navigate the path to your financial dreams!</p>
                    `
                );
        
        //redering the introduction boxes on the home page
        general.pageContentContainer.insertAdjacentHTML('beforeend', 
            `
            <div class = 'homeIntrosContainer'>
                <div id='homeBudgetIntroContainer' class = 'pageIntroContainer'>
                    <div  class = 'pageTitleContainer'>
                        <div class="shortcutContainer">
                            <img src="Images/budgetIcon.png" alt="Budget Shortcut Icon" class="shortcutIcon">
                        </div>

                        <p class = 'pageIntroTitle brightTitle'> Budgeting</p>
                    </div>
                    
                    <p class = 'brightTitle'>
                        Take control of your money with an easy-to-use budgeting tool that helps you spend smarter and save more.
                    </p>
                </div>

                <div id='homeDebtIntroContainer' class = 'pageIntroContainer'>
                    <div class = 'pageTitleContainer'>

                        <div class="shortcutContainer">
                            <img src="Images/debtFreeIcon.png" alt="Debt Shortcut Icon" class="shortcutIcon">
                        </div>

                        <p class = 'pageIntroTitle brightTitle'> Tackling Debt</p>
                    </div>
                    
                    <p class = 'brightTitle'>
                        Say goodbye to stress. Get out of debt with a clear plan. Feel in control and confident every step of the way.
                    </p>
                </div>
                
                <div id='homeInvestmentIntroContainer' class = 'pageIntroContainer'>
                    <div class = 'pageTitleContainer'>

                        <div class="shortcutContainer">
                            <img src="Images/investmentIcon.png" alt="Investment Shortcut Icon" class="shortcutIcon">
                        </div>

                        <p class = 'pageIntroTitle brightTitle'> Investing and Retirement</p>
                    </div>
                    
                    <p class = 'brightTitle'>
                        Grow your money and plan for the future with this simple to use investment and retirement income calculator.
                    </p>
                </div>
                
                <div id='homeEducationIntroContainer' class = 'pageIntroContainer'>
                    <div class = 'pageTitleContainer'>

                        <div class="shortcutContainer">
                            <img src="Images/educationIcon.png" alt="Education Shortcut Icon" class="shortcutIcon">
                        </div>

                        <p class = 'pageIntroTitle brightTitle'> Education</p>
                    </div>
                    
                    <p class = 'brightTitle'>
                        Learn the money skills they never taught in school. Gain confidence to make smarter decisions and take control of your financial future.
                    </p>
                </div>
            </div>
            `
        );

        //pointers to shortcut buttons

        
        if (!homeEventsLoaded)
        {
            //creating pointers to the button and the intro container. if either is clicked the user will
            //be routed to that page
            const budgetShortcutBtn = document.getElementById("budgetShortcut");
            const homeBudgetIntroContainer = document.getElementById("homeBudgetIntroContainer");
            budget.setupBudgetShortcutListener(budgetShortcutBtn);
            budget.setupBudgetShortcutListener(homeBudgetIntroContainer);


            const debtShortcutBtn = document.getElementById("debtShortcut");
            const homeDebtIntroContainer = document.getElementById("homeDebtIntroContainer");
            debt.setupDebtShortcutListener(debtShortcutBtn);
            debt.setupDebtShortcutListener(homeDebtIntroContainer);


            const investShortcutBtn = document.getElementById("investShortcut");
            const homeInvestmentIntroContainer = document.getElementById("homeInvestmentIntroContainer");
            investments.setupInvestmentShortcutListener(investShortcutBtn);
            investments.setupInvestmentShortcutListener(homeInvestmentIntroContainer);

            const educationShortcutBtn = document.getElementById("educationShortcut");
            const homeEducationIntroContainer = document.getElementById("homeEducationIntroContainer");
            education.setupEducationShortcutListener(educationShortcutBtn);
            education.setupEducationShortcutListener(homeEducationIntroContainer);
    
            homeEventsLoaded = true;
                    
        }
        

        


    });

}