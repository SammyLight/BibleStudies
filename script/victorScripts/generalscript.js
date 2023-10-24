//active link
document.addEventListener('DOMContentLoaded', function() {
  var currentUrl = window.location.pathname;
  console.log(currentUrl);
  var menuLinks = document.querySelectorAll('.header-links a');
  console.log(menuLinks);
  
  menuLinks.forEach(function(link) {
    if (link.getAttribute('href') === currentUrl) {
      link.classList.add('active');
    }
  });
});
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

// Remove the the last element in the archive page
const archiveElements = document.getElementsByClassName('archive');
// Ensure there are elements with the class "archive" before attempting to remove.
if (archiveElements.length > 0) {
  const lastArchiveElement = archiveElements[archiveElements.length - 1];
  const lastChild = lastArchiveElement.lastElementChild;
  if (lastChild) {
    // Check if there is a last child element to remove.
    lastArchiveElement.removeChild(lastChild);
  }
}
//Reverse the arrangement of summary categories (could not achive this Jekyll at this time)
const categories = document.getElementsByClassName('postCategories')[0];
const categoriesChildrenToRev = Array.from(categories.getElementsByClassName('homeResources-grid-containter'));
categoriesChildrenToRev.reverse();
for (const homeResourcesGridContainter of categoriesChildrenToRev) {
  categories.appendChild(homeResourcesGridContainter);
}

// document.addEventListener("DOMContentLoaded", function() {
//   // Get all <ul> elements with the class "reducedLength"
//   var uls = document.getElementsByClassName("reducedLength");
//   // Specify the start index from which you want to remove elements
//   var startIndex = 6;
//   // Loop through each <ul> element and remove items from the startIndex
//   for (var j = 0; j < uls.length; j++) {
//     var ul = uls[j];
//     // Check if the startIndex is valid
//     if (startIndex >= 0 && startIndex < ul.children.length) {
//       // Remove all <li> elements from the startIndex to the end
//       for (var i = ul.children.length - 1; i >= startIndex; i--) {
//         ul.removeChild(ul.children[i]);
//       }
//     }
//   }
// });
