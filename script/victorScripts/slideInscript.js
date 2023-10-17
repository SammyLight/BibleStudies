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