import * as general from './index.js';

// Example update function
    function filterVideos(userTags) {

        const allVideos = document.querySelectorAll('.individualVideoContainer');

        allVideos.forEach(video => {
            // Get the text content of all tags in this video container
            const videoTags = Array.from(video.querySelectorAll('.videoTag'))
                            .map(tag => tag.textContent.trim());

            // Check if any of the selected tags match this video's tags
            const hasMatch = userTags.length === 0 || userTags.some(tag => videoTags.includes(tag));

            // Show or hide video based on tag match
            video.style.display = hasMatch ? 'block' : 'none';

        })
    }

function handleEducationSetupClick () {
    general.clearContainers();
    
    //adding the title for the debt section
    general.mainContentInitiation('Education');

    //adding the help button
    general.introContainer.insertAdjacentHTML('beforeend', 
            `<div class="icon-container">
                    <p class="icon"> i </p> 
                        <div class="hover-box">
                            <p class="instructionsText">Instructions:</p> 
                            <ol class="instructionsText">
                                <li>Select the video tags you are interested in.</li><br>
                                <li>Click on a video to watch.</li><br>
                            </ol>
                        </div>
                </div>`
        );

    general.pageContentContainer.insertAdjacentHTML('beforeend',
        `
        <div class = 'selectionTagsContainer'>
            <span>
                <label class = 'tagLabel'>
                    <input type='checkbox' name='tags' value = 'Budgeting' checked>
                    Budgeting
                </label>
            </span>
            <span>
                <label class = 'tagLabel'>
                    <input type='checkbox' name='tags' value = 'Career' checked>
                    Career
                </label>
            </span>
            <span>
                <label class = 'tagLabel'>
                    <input type='checkbox' name='tags' value = 'Debt' checked>
                    Debt
                </label>
            </span>
            <span>
                <label class = 'tagLabel'>
                    <input type='checkbox' name='tags' value = 'Entertainment' checked>
                    Entertainment
                </label>
            </span>
            <span>
                <label class = 'tagLabel'>
                    <input type='checkbox' name='tags' value = 'Mindset' checked>
                    Mindset
                </label>
            </span>
            
            <span>
                <label class = 'tagLabel'>
                    <input type='checkbox' name='tags' value = 'Savings' checked>
                    Savings
                </label>
            </span>
        </div>
        `
    );
 
    general.pageContentContainer.insertAdjacentHTML('beforeend',
        `
        <div class = 'masterVideosContainer'>

            <div class = 'individualVideoContainer'>
                
                <a href='https://www.youtube.com/watch?v=m4ZT1EEU0Nw' class='videoPictureContainer'>
                    <img src = 'https://img.youtube.com/vi/zAtRt8EU6fg/hqdefault.jpg' class = 'videoImage'> 
                </a>
                
                <p class = 'videoTitle'> I Will Teach You To Be Rich in 10 Minutes </p>

                <div class = 'videoTagsContainer'>
                    <span class='videoTag'>Mindset</span>
                </div>

            </div>

            <div class = 'individualVideoContainer'>
                <a href='https://www.youtube.com/watch?v=jNUbhmB8zw8' class='videoPictureContainer'>
                    <img src = 'https://img.youtube.com/vi/jNUbhmB8zw8/hqdefault.jpg' class = 'videoImage'> 
                </a>
                
                <p class = 'videoTitle'> How To Start Following The 50/30/20 Rule To Eliminate Budgeting Stress
                </p>

                <div class = 'videoTagsContainer'>
                    <span class='videoTag'>Budgeting</span>
                </div>
            </div>

            <div class = 'individualVideoContainer'>
                <a href='https://www.youtube.com/watch?v=sCiE4X_y1a0' class='videoPictureContainer'>
                    <img src = 'https://img.youtube.com/vi/sCiE4X_y1a0/hqdefault.jpg' class = 'videoImage'> 
                </a>
                
                <p class = 'videoTitle'> What Is a Savings Account and How Do They Work?
                </p>

                <div class = 'videoTagsContainer'>
                    <span class='videoTag'>Mindset</span>
                    <span class='videoTag'>Savings</span>
                </div>
            </div>

            <div class = 'individualVideoContainer'>
                <a href='https://www.youtube.com/watch?v=1vR1TKEuFYg' class='videoPictureContainer'>
                    <img src = 'https://img.youtube.com/vi/1vR1TKEuFYg/hqdefault.jpg' class = 'videoImage'> 
                </a>
                
                <p class = 'videoTitle'>What is Debt | Good Debt vs Bad Debt | DEBT EXPLAINED
                </p>

                <div class = 'videoTagsContainer'>
                    <span class='videoTag'>Debt</span>
                </div>
            </div>

            <div class = 'individualVideoContainer'>
                <a href='https://www.youtube.com/watch?v=qIw-yFC-HNU' class='videoPictureContainer'>
                    <img src = 'https://img.youtube.com/vi/qIw-yFC-HNU/hqdefault.jpg' class = 'videoImage'> 
                </a>
                
                <p class = 'videoTitle'>The Basics of Investing (Stocks, Bonds, Mutual Funds, and Types of Interest)
                </p>

                <div class = 'videoTagsContainer'>
                    <span class='videoTag'>Savings</span>
                </div>
            </div>

            <div class = 'individualVideoContainer'>
                <a href='https://www.youtube.com/watch?v=Grn4Ef2VE_c' class='videoPictureContainer'>
                    <img src = 'https://img.youtube.com/vi/Grn4Ef2VE_c/hqdefault.jpg' class = 'videoImage'> 
                </a>
                
                <p class = 'videoTitle'>Financial Advisors React to Money Advice from Dave Ramsey</p>

                <div class = 'videoTagsContainer'>
                    <span class='videoTag'>Entertainment</span>
                    <span class='videoTag'>Mindset</span>

                </div>
            </div>

            <div class = 'individualVideoContainer'>
                <a href='https://www.youtube.com/watch?v=zhpcgpqWc1Q' class='videoPictureContainer'>
                    <img src = 'https://img.youtube.com/vi/zhpcgpqWc1Q/hqdefault.jpg' class = 'videoImage'> 
                </a>
                
                <p class = 'videoTitle'>How to Choose the Right Career Path in 7 Simple Steps</p>

                <div class = 'videoTagsContainer'>
                    <span class='videoTag'>Career</span>
                </div>
            </div>

            <div class = 'individualVideoContainer'>
                <a href='https://www.youtube.com/watch?v=bCOTS41iOSc' class='videoPictureContainer'>
                    <img src = 'https://img.youtube.com/vi/bCOTS41iOSc/hqdefault.jpg' class = 'videoImage'> 
                </a>
                
                <p class = 'videoTitle'>Top 10 INSANE Money Advice Videos - Financial Advisors React</p>

                <div class = 'videoTagsContainer'>
                    <span class='videoTag'>Entertainment</span>
                </div>
            </div>

        </div>
        `    
    );

    // Select all checkboxes
    const checkboxes = document.querySelectorAll('.selectionTagsContainer input[type="checkbox"]');

    // Attach a listener to each checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {  // Called every time a checkbox is checked or unchecked

            // Example: Get all selected tag values
            const selectedTags = Array.from(checkboxes) //converting checkboxes to an array
            .filter(cb => cb.checked) //filters the array into only the checkboxes that are checked
            .map(cb => cb.value);     //extracting only the values from the remaining checkboxes

            // Do something with selectedTags
            console.log('Selected Tags:', selectedTags);

            // calling our helper function to filter the appropriate videos
            filterVideos(selectedTags);
        });
    });

}

export function setupEducationShortcutListener (educationShortcutBtn) {

        educationShortcutBtn.addEventListener ('click', handleEducationSetupClick);
    
}