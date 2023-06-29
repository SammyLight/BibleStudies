var div1 = document.createElement('div');
div1.classList.add('myDropdown2-content');
div1.classList.add('container-fluid-inner');
var div2 = document.createElement('div');
div2.id = 'myDropdown2';
div2.classList.add('myDropdown2');
var ul1 = document.createElement('ul');
ul1.id = 'header-links2';
ul1.classList.add('header-links2');
div2.append(ul1);
div1.append(div2);
var headerContainer = document.querySelector('.header-container');
headerContainer.append(div1);

document.querySelector('.mobileButton').classList.add('Button');
var createButton = document.createElement('button');
createButton.classList.add('moreButton')
createButton.classList.add('Button')
createButton.type = 'Button'
createButton.innerHTML = 'More <i class="fas fa-solid fa-caret-down"></i>'
createButton.addEventListener('click', myFunctionTwo);
var headerUL = document.querySelector('.headerUL');

const headerLink1 = document.querySelectorAll('.header-links-li');
const elementArray = [...headerLink1];
if (elementArray.length > 5) {
    headerUL.append(createButton);
}
const cutheaderLink = elementArray.splice(5, 120);
const headerLink2 = document.getElementById('header-links2');
cutheaderLink.forEach(element => {
    headerLink2.append(element);
    element.classList.add('slideIn');
});

const elementChild = document.querySelectorAll('.header-links2>.header-links-li>.iconLink');
const elementChildArray = [...elementChild];
elementChildArray.forEach(element => {
    element.classList.add('iconLink2');
});

function myFunctionTwo() {
    document.getElementById("myDropdown2").classList.toggle("show");
    document.getElementById("myDropdown2").classList.toggle("slideIn");
}
