//PAGE PRELOAD
setTimeout(function() {
    $('.loader-bg-bibleQuiz').fadeToggle();
}, 1500);

// FOR TOGGLING THEMES
var head = document.head || document.getElementsByTagName('head')[0];
var reftaggerLightCityCssFile;
var antiqueWhiteCssFile;
var blackCssFile;
var blackPearlCssFile;
var copperRoseCssFile;
var crimsonCssFile;
var darkCyanCssFile;
var darkGreyCssFile;
var darkPurpleCssFile; //Defualt Theme
var whiteCssFile;

darkPurpleCssFile = document.getElementById('darkPurpleCssFile');
reftaggerLightCityCssFile = document.getElementById('reftaggerLightCityCssFile');

const antiqueWhiteThemeBtn = document.getElementsByClassName('antiqueWhiteCssFile');
Array.from(antiqueWhiteThemeBtn).forEach(element => {
    element.addEventListener('click', changeToAntiquewhiteTheme);
});
const blackPearlThemeBtn = document.getElementsByClassName('blackPearlCssFile');
Array.from(blackPearlThemeBtn).forEach(element => {
    element.addEventListener('click', changeToBlackPearlTheme);
});
const blackThemeBtn = document.getElementsByClassName('blackCssFile');
Array.from(blackThemeBtn).forEach(element => {
    element.addEventListener('click', changeToBlackTheme);
});
const copperRoseThemeBtn = document.getElementsByClassName('copperRoseCssFile');
Array.from(copperRoseThemeBtn).forEach(element => {
    element.addEventListener('click', changeToCopperRoseTheme);
});
const crimsonThemeBtn = document.getElementsByClassName('crimsonCssFile');
Array.from(crimsonThemeBtn).forEach(element => {
    element.addEventListener('click', changeToCrimsonTheme);
});
const darkCyanThemeBtn = document.getElementsByClassName('darkCyanCssFile');
Array.from(darkCyanThemeBtn).forEach(element => {
    element.addEventListener('click', changeToDarkCyanTheme);
});
const darkGreyThemeBtn = document.getElementsByClassName('darkGreyCssFile');
Array.from(darkGreyThemeBtn).forEach(element => {
    element.addEventListener('click', changeToDarkGreyTheme);
});
const darkPurpleThemeBtn = document.getElementsByClassName('darkPurpleCssFile');
Array.from(darkPurpleThemeBtn).forEach(element => {
    element.addEventListener('click', changeToDarkPurpleTheme);
});
const whiteThemeBtn = document.getElementsByClassName('whiteCssFile');
Array.from(whiteThemeBtn).forEach(element => {
    element.addEventListener('click', changeToWhiteTheme);
});

function setDarkOrLightModeInCache(colorMode){
    localStorage.setItem('colorMode', colorMode)
}
function getDarkOrLightModeFROMCache(){
    if(colorMode = localStorage.getItem('colorMode')){
        if(colorMode=='DarkPurpleTheme'){changeToDarkPurpleTheme()}
        else if(colorMode=='BlackTheme'){changeToBlackTheme()}
        else if(colorMode=='BlackPearlTheme'){changeToBlackPearlTheme()}
        else if(colorMode=='CopperRoseTheme'){changeToCopperRoseTheme()}
        else if(colorMode=='CrimsonTheme'){changeToCrimsonTheme()}
        else if(colorMode=='DarkGreyTheme'){changeToDarkGreyTheme()}
        else if(colorMode=='DarkCyanTheme'){changeToDarkCyanTheme()}
        else if(colorMode=='AntiquewhiteTheme'){changeToAntiquewhiteTheme()}
        else if(colorMode=='whiteTheme'){changeToWhiteTheme()}
    } else {changeToDarkPurpleTheme()}
}
function changeToAntiquewhiteTheme() {
    setDarkOrLightModeInCache('AntiquewhiteTheme');
    antiqueWhiteCssFile = document.createElement('link');
    antiqueWhiteCssFile.id = 'antiqueWhiteCssFile'
    antiqueWhiteCssFile.type = 'text/css';
    antiqueWhiteCssFile.href = '../style/bibleQuizBG-antiquewhite.css';
    antiqueWhiteCssFile.rel = 'stylesheet';
    head.insertBefore(antiqueWhiteCssFile, reftaggerLightCityCssFile);
    if (blackCssFile) blackCssFile.remove();
    if (blackPearlCssFile) blackPearlCssFile.remove();
    if (copperRoseCssFile) copperRoseCssFile.remove();
    if (crimsonCssFile) crimsonCssFile.remove();
    if (darkCyanCssFile) darkCyanCssFile.remove();
    if (darkGreyCssFile) darkGreyCssFile.remove();
    if (darkPurpleCssFile) darkPurpleCssFile.remove();
    if (whiteCssFile) whiteCssFile.remove();
}
function changeToBlackTheme() {
    setDarkOrLightModeInCache('BlackTheme');
    blackCssFile = document.createElement('link');
    blackCssFile.id = 'blackCssFile'
    blackCssFile.type = 'text/css';
    blackCssFile.href = '../style/bibleQuizBG-black.css';
    blackCssFile.rel = 'stylesheet';
    head.insertBefore(blackCssFile, reftaggerLightCityCssFile);
    if (antiqueWhiteCssFile) antiqueWhiteCssFile.remove();
    if (blackPearlCssFile) blackPearlCssFile.remove();
    if (copperRoseCssFile) copperRoseCssFile.remove();
    if (crimsonCssFile) crimsonCssFile.remove();
    if (darkCyanCssFile) darkCyanCssFile.remove();
    if (darkGreyCssFile) darkGreyCssFile.remove();
    if (darkPurpleCssFile) darkPurpleCssFile.remove();
    if (whiteCssFile) whiteCssFile.remove();
}
function changeToBlackPearlTheme() {
    setDarkOrLightModeInCache('BlackPearlTheme');
    blackPearlCssFile = document.createElement('link');
    blackPearlCssFile.id = 'blackPearlCssFile'
    blackPearlCssFile.type = 'text/css';
    blackPearlCssFile.href = '../style/bibleQuizBG-blackpearl.css';
    blackPearlCssFile.rel = 'stylesheet';
    head.insertBefore(blackPearlCssFile, reftaggerLightCityCssFile);
    if (antiqueWhiteCssFile) antiqueWhiteCssFile.remove();
    if (blackCssFile) blackCssFile.remove();
    if (copperRoseCssFile) copperRoseCssFile.remove();
    if (crimsonCssFile) crimsonCssFile.remove();
    if (darkCyanCssFile) darkCyanCssFile.remove();
    if (darkGreyCssFile) darkGreyCssFile.remove();
    if (darkPurpleCssFile) darkPurpleCssFile.remove();
    if (whiteCssFile) whiteCssFile.remove();
}
function changeToCopperRoseTheme() {
    setDarkOrLightModeInCache('CopperRoseTheme');
    copperRoseCssFile = document.createElement('link');
    copperRoseCssFile.id = 'copperRoseCssFile'
    copperRoseCssFile.type = 'text/css';
    copperRoseCssFile.href = '../style/bibleQuizBG-copperrose.css';
    copperRoseCssFile.rel = 'stylesheet';
    head.insertBefore(copperRoseCssFile, reftaggerLightCityCssFile);
    if (antiqueWhiteCssFile) antiqueWhiteCssFile.remove();
    if (blackCssFile) blackCssFile.remove();
    if (blackPearlCssFile) blackPearlCssFile.remove();
    if (crimsonCssFile) crimsonCssFile.remove();
    if (darkCyanCssFile) darkCyanCssFile.remove();
    if (darkGreyCssFile) darkGreyCssFile.remove();
    if (darkPurpleCssFile) darkPurpleCssFile.remove();
    if (whiteCssFile) whiteCssFile.remove();
}
function changeToCrimsonTheme() {
    setDarkOrLightModeInCache('CrimsonTheme');
    crimsonCssFile = document.createElement('link');
    crimsonCssFile.id = 'crimsonCssFile'
    crimsonCssFile.type = 'text/css';
    crimsonCssFile.href = '../style/bibleQuizBG-crimson.css';
    crimsonCssFile.rel = 'stylesheet';
    head.insertBefore(crimsonCssFile, reftaggerLightCityCssFile);
    if (antiqueWhiteCssFile) antiqueWhiteCssFile.remove();
    if (blackCssFile) blackCssFile.remove();
    if (blackPearlCssFile) blackPearlCssFile.remove();
    if (copperRoseCssFile) copperRoseCssFile.remove();
    if (darkCyanCssFile) darkCyanCssFile.remove();
    if (darkGreyCssFile) darkGreyCssFile.remove();
    if (darkPurpleCssFile) darkPurpleCssFile.remove();
    if (whiteCssFile) whiteCssFile.remove();
}
function changeToDarkCyanTheme() {
    setDarkOrLightModeInCache('DarkCyanTheme');
    darkCyanCssFile = document.createElement('link');
    darkCyanCssFile.id = 'darkCyanCssFile'
    darkCyanCssFile.type = 'text/css';
    darkCyanCssFile.href = '../style/bibleQuizBG-darkcyan.css';
    darkCyanCssFile.rel = 'stylesheet';
    head.insertBefore(darkCyanCssFile, reftaggerLightCityCssFile);
    if (antiqueWhiteCssFile) antiqueWhiteCssFile.remove();
    if (blackCssFile) blackCssFile.remove();
    if (blackPearlCssFile) blackPearlCssFile.remove();
    if (copperRoseCssFile) copperRoseCssFile.remove();
    if (crimsonCssFile) crimsonCssFile.remove();
    if (darkGreyCssFile) darkGreyCssFile.remove();
    if (darkPurpleCssFile) darkPurpleCssFile.remove();
    if (whiteCssFile) whiteCssFile.remove();
}
function changeToDarkGreyTheme() {
    setDarkOrLightModeInCache('DarkGreyTheme');
    darkGreyCssFile = document.createElement('link');
    darkGreyCssFile.id = 'darkGreyCssFile'
    darkGreyCssFile.type = 'text/css';
    darkGreyCssFile.href = '../style/bibleQuizBG-darkgrey.css';
    darkGreyCssFile.rel = 'stylesheet';
    head.insertBefore(darkGreyCssFile, reftaggerLightCityCssFile);
    if (antiqueWhiteCssFile) antiqueWhiteCssFile.remove();
    if (blackCssFile) blackCssFile.remove();
    if (blackPearlCssFile) blackPearlCssFile.remove();
    if (copperRoseCssFile) copperRoseCssFile.remove();
    if (crimsonCssFile) crimsonCssFile.remove();
    if (darkCyanCssFile) darkCyanCssFile.remove();
    if (darkPurpleCssFile) darkPurpleCssFile.remove();
    if (whiteCssFile) whiteCssFile.remove();
}
function changeToDarkPurpleTheme() {
    setDarkOrLightModeInCache('DarkPurpleTheme');
    head.insertBefore(darkPurpleCssFile, reftaggerLightCityCssFile);
    // Reference the existing links element
    antiqueWhiteCssFile = document.getElementById('antiqueWhiteCssFile');
    copperRoseCssFile = document.getElementById('copperRoseCssFile');
    crimsonCssFile = document.getElementById('crimsonCssFile');
    blackPearlCssFile = document.getElementById('blackPearlCssFile');
    darkCyanCssFile = document.getElementById('darkCyanCssFile');
    darkGreyCssFile = document.getElementById('darkGreyCssFile');
    darkPurpleCssFile = document.getElementById('darkPurpleCssFile');
    // Remove other CSS files
    if (antiqueWhiteCssFile) antiqueWhiteCssFile.remove();
    if (blackCssFile) blackCssFile.remove();
    if (blackPearlCssFile) blackPearlCssFile.remove();
    if (copperRoseCssFile) copperRoseCssFile.remove();
    if (crimsonCssFile) crimsonCssFile.remove();
    if (darkCyanCssFile) darkCyanCssFile.remove();
    if (darkGreyCssFile) darkGreyCssFile.remove();
    if (whiteCssFile) whiteCssFile.remove();
}
function changeToWhiteTheme() {
    setDarkOrLightModeInCache('whiteTheme');
    whiteCssFile = document.createElement('link');
    whiteCssFile.id = 'whiteCssFile'
    whiteCssFile.type = 'text/css';
    whiteCssFile.href = '../style/bibleQuizBG-white.css';
    whiteCssFile.rel = 'stylesheet';
    head.insertBefore(whiteCssFile, reftaggerLightCityCssFile);
    if (antiqueWhiteCssFile) antiqueWhiteCssFile.remove();
    if (blackCssFile) blackCssFile.remove();
    if (blackPearlCssFile) blackPearlCssFile.remove();
    if (copperRoseCssFile) copperRoseCssFile.remove();
    if (crimsonCssFile) crimsonCssFile.remove();
    if (darkCyanCssFile) darkCyanCssFile.remove();
    if (darkPurpleCssFile) darkPurpleCssFile.remove();
}
// Initialize theme on page load
getDarkOrLightModeFROMCache();

// Function to add "current" label to the active LI element
function addCurrentLabelToActiveThemeBtn(btnClassName) {
    // Remove "current" label from other LI elements
    var allListItems = document.querySelectorAll('.themeSettings li');
    allListItems.forEach(item => {
        removeCurrentLabel(item);
    });
    var activeThemeBtns = document.querySelectorAll('.' + btnClassName);
    activeThemeBtns.forEach(element => {
        addCurrentLabel(element);
    });
}
// Event listener for theme settings container
document.addEventListener('click', function (event) {
    var targetElement = event.target;
    var liElement = targetElement.closest('.themeSettings li');
    if (liElement) {
        addCurrentLabelToActiveThemeBtn(liElement.className);
    }
});
// document.addEventListener('DOMContentLoaded', function() {
    // Get all the themeSettings divs in the document
    var themeSettingsDivs = document.querySelectorAll('.themeSettings');
    // Loop through each themeSettings div
    themeSettingsDivs.forEach(function(themeSettingsDiv) {
        // Get the list items inside the current themeSettings div
        var listItems = themeSettingsDiv.querySelectorAll('ul.content li');
        // Loop through the list items
        listItems.forEach(function(li) {
            // Get the class of each li element
            var selectedClass = li.className;
            // Find the link element in the head with a matching ID
            // var linkElement = document.querySelector('head link#' + selectedClass + 'CssFile:last-of-type');
            var linkElement = document.querySelector('head link#' + selectedClass);
            // You can now manipulate the linkElement as needed
            if (linkElement) {
                // Run the addCurrentLabel function on the current LI element
                addCurrentLabel(li);
            }
        });
    });
// });

// FOR TOGGLING FONT
// Function add current label
function addCurrentLabel(liElement) {
    const indicateCurrentFontAndTheme = document.createElement('em');
    indicateCurrentFontAndTheme.innerHTML = '(current)';
    var liElementP = liElement.querySelector('p');
    // Check if the first child is a p <p>
    if (liElement.firstChild && liElement.firstChild === liElementP) {
        // Insert the <em> element after the <p>
        liElement.insertBefore(indicateCurrentFontAndTheme, liElement.firstChild.nextSibling);
    } else {
        // Insert the <em> element before the last child (which is the <span> )
        liElement.insertBefore(indicateCurrentFontAndTheme, liElement.lastChild);
    }
}
// Function remove current label
function removeCurrentLabel(liElement) {
    var currentLabel = liElement.querySelector('em');
    if (currentLabel) {
        liElement.removeChild(currentLabel);
    }
}
// Function to find LI element for a given font within a specific container
function findLiElementForFontInContainer(font, container) {
    // Find the LI element with the specified font value within the container
    var allListItems = container.querySelectorAll('li');
    for (var i = 0; i < allListItems.length; i++) {
        if (allListItems[i].getAttribute('font') === font) {
            return allListItems[i];
        }
    }
    return null; // Return null if not found
}
// Function to add "current" label to all occurrences of the specified font
function addCurrentLabelToAllOccurrences(font) {
    // Get all occurrences of the font settings structure
    var fontSettingsContainers = document.querySelectorAll('.fontSettings');
    // Loop through each occurrence
    fontSettingsContainers.forEach(function (container) {
        // Find the corresponding LI element based on the selectedFont attribute
        var liElement = findLiElementForFontInContainer(font, container);
        var allListItems = container.querySelectorAll('.fontSettings li');
        allListItems.forEach(item => {
            removeCurrentLabel(item);
        });
        // Set the font for the body
        document.body.style.fontFamily = font;
        // Save the selected font to localStorage
        localStorage.setItem('selectedFont', font);
        // If the LI element is found, add the "current" label
        if (liElement) {
            addCurrentLabel(liElement);
        }
    });
}
// Run on page load
// Get the saved font from localStorage
var savedFont = localStorage.getItem('selectedFont');
if (savedFont) {
    // Apply the saved font to the body
    document.body.style.fontFamily = savedFont;
    // Add "current" label to all occurrences of the saved font
    addCurrentLabelToAllOccurrences(savedFont);
}
// Event listener for font settings container
document.addEventListener('click', function (event) {
    var targetElement = event.target;
    var fontSettingsContainer = targetElement.closest('.fontSettings');
    if (fontSettingsContainer) {
        var liElement = targetElement.closest('li');
        if (liElement) {
            var selectedFont = liElement.getAttribute('font');
            // Call the function to add the "current" label to all occurrences
            addCurrentLabelToAllOccurrences(selectedFont);
        }
    }
});
//Get the font value in the attribute of each Li and make the font-family of its span(created)
const fontSettings = document.getElementsByClassName('fontSettings');
Array.from(fontSettings).forEach(element => {
    const fontSettingsLi = element.querySelectorAll('li');  
    fontSettingsLi.forEach(li => {
        const createSpanForFont = document.createElement('span');
        const createTextForFont = document.createTextNode('');
        const fontValue = li.getAttribute('font');
        li.style.fontFamily = fontValue;
        createSpanForFont.style.fontFamily = fontValue;
        createSpanForFont.appendChild(createTextForFont);
        li.appendChild(createSpanForFont);
    });
});
//Get the color value in the attribute of each Li and make the background-color of its span(created)
const themeSettings = document.getElementsByClassName('themeSettings');
Array.from(themeSettings).forEach(element => {
    const colorSettingsLi = element.querySelectorAll('li');  
    colorSettingsLi.forEach(li => {
        const createSpanForColor = document.createElement('span');
        const colorValue = li.getAttribute('color');
        createSpanForColor.style.background = colorValue;
        createSpanForColor.style.border = '1px solid ' + colorValue;
        li.appendChild(createSpanForColor);
        // Set the background of the elements with (.newBG) class to the colorValue of the current li with em on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Check if li has a child em
            const emElement = li.querySelector('em');
            const newBGElements = document.querySelectorAll('.newBG');
            if (emElement) {
                const emLiColorValue = emElement.parentElement.getAttribute('color');
                newBGElements.forEach(newBGElement => {
                    newBGElement.style.background = emLiColorValue;
                });
            }
        });
        // Set the background of the elements with (.newBG) class to the colorValue of the clicked li with em
        document.addEventListener('click', function(event) {
            const clickedElement = event.target;
            // Check if the clicked element is an <li> (or it's child) inside .themeSettings
            if ((clickedElement === li || li.contains(clickedElement)) && clickedElement.closest('.themeSettings')) {
                const themeSettingsLi = clickedElement.closest('.themeSettings').querySelectorAll('li');
                // Reset background and border for all themeSettings elements
                themeSettingsLi.forEach(li => {
                    const newBGElements = document.querySelectorAll('.newBG');
                    // newBGElements.forEach(newBGElement => {
                    //     newBGElement.style.background = '';
                    // });
                    const emElement = li.querySelector('em');
                    if (emElement) {
                        const emLiColorValue = emElement.parentElement.getAttribute('color');
                        newBGElements.forEach(newBGElement => {
                            newBGElement.style.background = emLiColorValue;
                        });
                    }
                });
            }
        });
    });
});