/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
var myDropdown = document.getElementById("myDropdown");
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
var createButton = document.createElement('button');
createButton.classList.add('moreButton', 'Button');
createButton.type = 'Button';
createButton.innerHTML = 'More <i class="fas fa-solid fa-caret-down"></i>'
createButton.addEventListener('click', myFunctionTwo);
var div1 = document.createElement('div');
div1.classList.add('myDropdown2-content', 'container-fluid-inner');
var div2 = document.createElement('div');
div2.id = 'myDropdown2';
div2.classList.add('myDropdown2');
var ul1 = document.createElement('div');
ul1.id = 'header-links2';
ul1.classList.add('header-links2');
div2.append(ul1);
div1.append(div2);
var headerContainer = document.querySelector('.header-container');
headerContainer.append(div1);
function myFunctionTwo() {
  if (div2.classList.contains('slideOut')) {
    div2.classList.remove('slideOut');
    div2.classList.add('slideInFromLeft');
  } else {
    div2.classList.remove('slideInFromLeft');
    div2.classList.add('slideOut');
  }
}
const myDropdowns = document.querySelectorAll(".myDropdown, .myDropdown2");
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
var headerUL = document.querySelector('.headerUL');
const headerLink1 = document.querySelectorAll('.header-links-li');
const elementArray = [...headerLink1];
if (elementArray.length > 5) {
    headerUL.append(createButton);
}
const cutheaderLink = elementArray.splice(5);
const headerLink2 = document.getElementById('header-links2');
cutheaderLink.forEach(element => {
    headerLink2.append(element);
});
const elementChild = document.querySelectorAll('.header-links2>.header-links-li>.iconLink');
const elementChildArray = [...elementChild];
elementChildArray.forEach(element => {
    element.classList.add('iconLink2');
});
