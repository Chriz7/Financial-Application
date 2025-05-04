import * as general from './index.js';

export function setupHomeShortcutListener (homeShortcutBtn) {

    homeShortcutBtn.addEventListener ('click', function(){

        general.clearContainers();

        general.introContainer.insertAdjacentHTML('beforeend', 
                    `<p class = pageIntroTitle>Welcome to Financial Compass - let's navigate the path to your financial dreams!</p>
                    `
                );
        
        general.pageContentContainer.insertAdjacentHTML('beforeend', 
            `<div class = 'pageIntroContainer'>
                            <div class = 'pageTitleContainer'>

                                <div class="shortcutContainer">
                                    <img src="Images/budgetIcon.png" alt="Budget Shortcut Icon" class="shortcutIcon">
                                </div>

                                <p class = pageIntroTitle> Budgeting</p>
                            </div>
                            
                            <p>
                                Take control of your money with an easy-to-use budgeting tool that helps you spend smarter and save more.
                            </p>
                        </div>

                        <div class = 'pageIntroContainer'>
                            <div class = 'pageTitleContainer'>

                                <div class="shortcutContainer">
                                    <img src="Images/debtFreeIcon.png" alt="Debt Shortcut Icon" class="shortcutIcon">
                                </div>

                                <p class = pageIntroTitle> Tackling Debt (Under Contruction)</p>
                            </div>
                            
                            <p>
                                Say goodbye to stress. Get out of debt with a clear plan. Feel in control and confident every step of the way.
                            </p>
                        </div>
                        
                        <div class = 'pageIntroContainer'>
                            <div class = 'pageTitleContainer'>

                                <div class="shortcutContainer">
                                    <img src="Images/investmentIcon.png" alt="Investment Shortcut Icon" class="shortcutIcon">
                                </div>

                                <p class = pageIntroTitle> Investing and Retirement</p>
                            </div>
                            
                            <p>
                                Grow your money and plan for the future with this simple to use investment and retirement income calculator.
                            </p>
                        </div>
                        
                        <div class = 'pageIntroContainer'>
                            <div class = 'pageTitleContainer'>

                                <div class="shortcutContainer">
                                    <img src="Images/educationIcon.png" alt="Education Shortcut Icon" class="shortcutIcon">
                                </div>

                                <p class = pageIntroTitle> Education (Under Contruction)</p>
                            </div>
                            
                            <p>
                                Learn the money skills they never taught in school. Gain confidence to make smarter decisions and take control of your financial future.
                            </p>
                        </div>`
        );

        //grabbing all the paragraph elements in the home content container
        const homeContentTexts = document.querySelectorAll('.masterContentContainer p');

        //updating them to a contrasting color 
        homeContentTexts.forEach(homeContentText => 
            {
            homeContentText.style.color = '#EFE9D5';
          });

    });

}