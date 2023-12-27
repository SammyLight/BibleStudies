/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
const myDropdown = document.getElementById("myDropdown");
function myFunction() {
  if (myDropdown.classList.contains('slideOut')) {
    myDropdown.classList.remove('slideOut');
    myDropdown.classList.add('slideInFromLeft');
  } else {
    myDropdown.classList.remove('slideInFromLeft');
    myDropdown.classList.add('slideOut');
  }
}

document.querySelector('.mobileButton').classList.add('Button');
const createButton = document.createElement('button')
createButton.classList.add('moreButton', 'Button');
createButton.type = 'Button';
createButton.innerHTML = 'More <i class="fas fa-solid fa-caret-down"></i>'
createButton.addEventListener('click', myFunctionDesk);
const myDropdownDeskCont = document.createElement('div');
myDropdownDeskCont.classList.add('myDropdownDesk-content', 'container-fluid-inner');
const myDropdownDesk = document.createElement('div');
myDropdownDesk.id = 'myDropdownDesk';
myDropdownDesk.classList.add('myDropdownDesk');
const headerLinks2 = document.createElement('div');
headerLinks2.id = 'header-links2';
headerLinks2.classList.add('header-links2', 'active-link');
myDropdownDesk.append(headerLinks2);
myDropdownDeskCont.append(myDropdownDesk);
const headerContainer = document.querySelector('.header-container');
headerContainer.append(myDropdownDeskCont);
function myFunctionDesk() {
  if (myDropdownDesk.classList.contains('slideOut')) {
    myDropdownDesk.classList.remove('slideOut');
    myDropdownDesk.classList.add('slideInFromLeft');
  } else {
    myDropdownDesk.classList.remove('slideInFromLeft');
    myDropdownDesk.classList.add('slideOut');
  }
}
const myDropdowns = document.querySelectorAll(".myDropdown, .myDropdownDesk");
const elementsArray = [...myDropdowns];
  elementsArray.forEach(element => {
    element.classList.add("slideOut");
  });
// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.Button')) {
    elementsArray.forEach(element => {
      if (element.classList.contains('slideInFromLeft')) {
        element.classList.remove('slideInFromLeft');
        element.classList.add('slideOut');
      }
    });
  }
}
const headerUL = document.querySelector('.headerUL');
const headerLink1 = document.querySelectorAll('.header-links-li');
const elementArray = [...headerLink1];
if (elementArray.length > 5) {
    headerUL.append(createButton);
}
const cutheaderLink = elementArray.splice(5);
const headerLink2 = document.getElementById('header-links2');
cutheaderLink.forEach(element => {
    headerLinks2.append(element);
});
const elementChild = document.querySelectorAll('.header-links2>.header-links-li>.iconLink');
const elementChildArray = [...elementChild];
elementChildArray.forEach(element => {
    element.classList.add('iconLink2');
});
//active link
document.addEventListener('DOMContentLoaded', function() {
  var currentUrl = window.location.pathname;
  var menuLinks = document.querySelectorAll('.active-link a'); 
  menuLinks.forEach(function(link) {
    if (link.getAttribute('href') === currentUrl) {
      link.classList.add('active');
    }
  });
});
