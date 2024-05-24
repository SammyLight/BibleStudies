const leftBorderForArticleTitle = document.createElement('div');
leftBorderForArticleTitle.classList.add('leftBorderForArticleTitle');
document.querySelector('article>main>header').prepend(leftBorderForArticleTitle);
const addClassToElement = (selector, className) => {
  const element = document.querySelector(selector);
  if (element) element.classList.add(className);
};
const handleAnimation = () => {
  // Apply animations to specific elements
  addClassToElement('#archive-date', 'slideInFromTop');
  addClassToElement('#expandANDdate', 'slideInFromBottom');
  addClassToElement('article>main>header', 'slideInFromLeft');  
  // Apply animation to various headings in the main content
  const headingSelectors = 'main>h1,main>h2,main>h3,main>h4,main>h5,main>h6';
  document.querySelectorAll(headingSelectors).forEach(element => element.classList.add('easeIn')); 
  // Apply animation to various elements in the main content
  const excludedSelectors = 'header,main>h1,main>h2,main>h3,main>h4,main>h5,main>h6';
  const elementsToAnimate = document.querySelectorAll(`main>*:not(${excludedSelectors})`);
  elementsToAnimate.forEach(element => element.classList.add('visibility'));
  // Delayed animation for other elements in the main content
  setTimeout(() => {
    elementsToAnimate.forEach(element => {
      if (element.classList.contains('visibility')) {
        element.classList.remove('visibility');
        element.classList.add('easeInTwo');
      }
    });
  }, 1600);
};
// Call the handleAnimation function after a delay
setTimeout(handleAnimation, 1500);

// OLD CODE
// var leftBorderForArticleTitle = document.createElement('div');
// leftBorderForArticleTitle.classList.add('leftBorderForArticleTitle');
// document.querySelector('article>main>header').prepend(leftBorderForArticleTitle);
// const myTime = setTimeout(expandANDdate, 1900);
// function expandANDdate() {
//     document.getElementById('archive-date').classList.add('slideInFromTop');
//     document.getElementById('expandANDdate').classList.add('slideInFromBottom');
//     const myHeaderH1 = document.querySelector('article>main>header')
//     myHeaderH1.classList.add('slideInFromLeft');
// }
// const myTimeinForArticle = setTimeout(myArticle, 1500);
// function myArticle() {
//     const myArticleTagNames = document.querySelectorAll('main>h1,main>h2,main>h3,main>h4,main>h5,main>h6');
//     const myArticleTagNamesArray = [...myArticleTagNames];
//     myArticleTagNamesArray.forEach(element => {
//         element.classList.add('easeIn');
//     });
// }
// const myArticlePreEl = document.querySelectorAll('main > *:not(header):not(main>h1):not(main>h2):not(main>h3):not(main>h4):not(main>h5):not(main>h6), main > *:not(header) > *:not(.H0) > *, main > *:not(header) > *:not(.H0) > * > *, main > *:not(header) > *:not(.H0) > * > * > *, main > *:not(header) > *:not(.H0) > * > * > * > *, main > *:not(header) > *:not(.H0) > * > * > * > * > *');
// const myArticlePreElArray = [...myArticlePreEl];
// myArticlePreElArray.forEach(element => {
//     element.classList.add('visibility');
// });
// const myTimeinForArticleText = setTimeout(myArticleText, 1800);
// function myArticleText() {
//     const myArticlePreEl = document.querySelectorAll('main > *:not(header):not(main>h1):not(main>h2):not(main>h3):not(main>h4):not(main>h5):not(main>h6), main > *:not(header) > *:not(.H0) > *, main > *:not(header) > *:not(.H0) > * > *, main > *:not(header) > *:not(.H0) > * > * > *, main > *:not(header) > *:not(.H0) > * > * > * > *, main > *:not(header) > *:not(.H0) > * > * > * > * > *');
//     const myArticlePreElArray = [...myArticlePreEl];
//     myArticlePreElArray.forEach(element => {
//         if (element.classList.contains('visibility')) {
//             element.classList.remove('visibility');
//             element.classList.add('easeInTwo');
//         }
//     });
// }

// getDate = document.getElementById('archive-date');
// console.log(getDate);