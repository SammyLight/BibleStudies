//https://stackoverflow.com/questions/13357515/how-to-dynamically-change-the-style-tag-using-javascript
// Change the CSS in the style section.
// Property is the name of the class or id E.G. ".mdc-card" or "#main".
// Style is the name of the CSS style. E.G. "Background".
// Value is the setting that the style will use, E.G. "Red"
// WARNING: STOPS AND EXECUTES ON THE FIRST MATCH DOES NOT PROCESS MORE AFTER THAT!!!
function changeCSS(property, style, value, cssSectionID) {
    if (cssSectionID === undefined) {
        cssSectionID = "mainCSS";
    }
    // Get the current CSS sheet.
    var mainCSS_1 = document.getElementById(cssSectionID);
    var changeStatus = false;
    // Refine the stylesheet into a more easily processed form.
    // It is done here as making it part of the variable definition produces issues where you still need to call the sheet property.
    mainCSS = mainCSS_1.sheet;

    // Only execute if the user has specified values for each of the required parameters.
    if (property !== undefined && style !== undefined && value !== undefined) {
        // Loop through all of the CSS Properties until the specified property is found.
        for (var index = 0; index < mainCSS.cssRules.length; index++) {

            // Only apply the value of the property matches.
            if (mainCSS.cssRules[index].selectorText === property.toString()) {
                // Apply the specified property value to the.
                mainCSS.cssRules[index].style[style.toString()] = value.toString();

                // Sets the exit status and breaks the loop's execution.
                changeStatus = true;
                var rulesString = '';
                var crL = mainCSS.cssRules.length;
                for (var i = 0; i < mainCSS.cssRules.length; i++) {
                    rulesString = rulesString + mainCSS.cssRules[i].cssText;
                    if (i == (crL - 1)){
                        mainCSS_1.innerText = rulesString;
                        console.log(rulesString)
                    }
                }
                break;
            }
        }
    }
    // Returns the result of the operation. True being successful and false being unsuccessful.
    return changeStatus;
}

function fillDivColorInput(newColor) {
    if (clickedDIV) {
        clickedDIV.style.backgroundColor = "";
        var dCM = '.opt_' + clickedDIV.getAttribute('divclassname');
        changeCSS(dCM, 'backgroundColor', newColor, 'divColorStyles');
        changeCSS(dCM, 'stroke', newColor, 'divColorStyles');

        //Change color and text of divColor options and input
        divColor.value = newColor;
        // divColor.style.backgroundColor = newColor;
        divColorOptionsDropdown.style.backgroundColor = newColor;

        //Change color of divNode's text if necesary for contrast
        var divToModify = document.querySelectorAll("div"+dCM);
        for(i=0; i<divToModify.length; i++){
            darkOrLightBG(divToModify[i])
        }
    }
}