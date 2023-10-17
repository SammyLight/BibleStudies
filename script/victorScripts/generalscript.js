var getTables = document.querySelectorAll('main>table');
var getTablesArray = [...getTables];
getTablesArray.forEach(element => {
  var createElemApTable = document.createElement('div')
  createElemApTable.classList.add('table-container');
  // Get the parent of the element
  var parentElement = element.parentElement;
  // Insert createElemApTable before the element
  parentElement.insertBefore(createElemApTable, element);
  // Move the table into createElemApTable
  createElemApTable.appendChild(element);
});

document.addEventListener("DOMContentLoaded", function() {
  // Get all <ul> elements with the class "reducedLength"
  var uls = document.getElementsByClassName("reducedLength");
  // Specify the start index from which you want to remove elements
  var startIndex = 6;
  // Loop through each <ul> element and remove items from the startIndex
  for (var j = 0; j < uls.length; j++) {
    var ul = uls[j];
    // Check if the startIndex is valid
    if (startIndex >= 0 && startIndex < ul.children.length) {
      // Remove all <li> elements from the startIndex to the end
      for (var i = ul.children.length - 1; i >= startIndex; i--) {
        ul.removeChild(ul.children[i]);
      }
    }
  }
});