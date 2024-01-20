// FOR TOGGLING FONT
// Function to toggle font and add current label
function toggleFontAndAddCurrentLabel(font) {
    // Remove "current" label from other LI elements
    var allListItems = document.querySelectorAll('.fontSettings li');
    allListItems.forEach(item => {
        removeCurrentLabel(item);
    });
    // Set the font for the body
    document.body.style.fontFamily = font;
    // Save the selected font to localStorage
    localStorage.setItem('selectedFont', font);
    // Find the corresponding LI element for the current font and add "current" label
    var currentLiElement = findLiElementForFont(font);
    if (currentLiElement) {
        addCurrentLabel(currentLiElement);
    }
}
// Function to find LI element for a given font
function findLiElementForFont(font) {
    // Find the LI element with the specified font value
    var allListItems = document.querySelectorAll('.fontSettings li');
    for (var i = 0; i < allListItems.length; i++) {
        if (allListItems[i].getAttribute('font') === font) {
            return allListItems[i];
        }
    }
    return null; // Return null if not found
}
// Function add current label
function addCurrentLabel(liElement) {
    const createTextForCurrentFont = document.createElement('em');
    createTextForCurrentFont.innerHTML = ' (current)';
    // Check if the first child is a text node
    if (liElement.firstChild && liElement.firstChild.nodeType === Node.TEXT_NODE) {
        // Insert the <em> element after the text node
        liElement.insertBefore(createTextForCurrentFont, liElement.firstChild.nextSibling);
    } else {
        // Insert the <em> element before the last child (which is the <span>)
        liElement.insertBefore(createTextForCurrentFont, liElement.lastChild);
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
        // If the LI element is found, add the "current" label
        if (liElement) {
            addCurrentLabel(liElement);
        }
    });
}
// Run on page load
document.addEventListener('DOMContentLoaded', function () {
    // Get the saved font from localStorage
    var savedFont = localStorage.getItem('selectedFont');
    if (savedFont) {
        // Apply the saved font to the body
        document.body.style.fontFamily = savedFont;
        // Add "current" label to all occurrences of the saved font
        addCurrentLabelToAllOccurrences(savedFont);
    }
});
// Event listener for font settings container
document.addEventListener('click', function (event) {
    var targetElement = event.target;
    var fontSettingsContainer = targetElement.closest('.fontSettings');
    if (fontSettingsContainer) {
        var liElement = targetElement.closest('li');
        if (liElement) {
            var selectedFont = liElement.getAttribute('font');
            toggleFontAndAddCurrentLabel(selectedFont);
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
        const createTextForFont = document.createTextNode('quiz');
        const fontValue = li.getAttribute('font');
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
        createSpanForColor.style.border ='1px solid ' + colorValue;
        li.appendChild(createSpanForColor);
    });
});