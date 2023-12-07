/* *** **** **** ********* */
/* FOR PURE HTML TIMELINES */
/* FOR AUTO RESIZING PURE-HTML-TIMELINE IF PRESENCE */
/* *** **** **** ********* */
function scaleElementWidthToParent(event, childElement = document.getElementsByClassName('pureHTMLtimeline')[0]) {
  parentElement = childElement.parentElement;
  let parentWidth = parentElement.offsetWidth;
  let childWidth = childElement.offsetWidth;
  let scaleFactor = parentWidth / childWidth;
  scaleFactor = scaleFactor<0.75?0.75:scaleFactor;//scaling should not go below '0.75'
  childElement.style.transform = `scale(${scaleFactor})`;

  // Adjust text to fit within the predefined height
  // childElement.querySelectorAll('.pureHTMLtimeline div').forEach(div => { 
  //     fitText(div)
  // });
  // let xxx = document.getElementsByClassName('pureHTMLtimeline')[0].querySelectorAll('.pureHTMLtimeline div');
  // for (let i = 0; i < xxx.length; i++) {
  //     fitText(xxx[i])
  // }
  // function fitText(div) {
  //     let divfs=div.style.fontSize;       
  //     let fontSize = divfs&&divfs.match(/%/)?Number(divfs.replace(/%/,'')):100; // Initial font size in percentage
  //     div.style.fontSize = fontSize + '%';
      
  //     if (fontSize>80 && isOverflowing(div)) {
  //         fontSize -= 10; // Adjust the font size decrement value as needed
  //         div.style.fontSize = fontSize + '%';
  //     }
  //     function isOverflowing(element) {
  //         console.log(true)
  //         if (element.scrollHeight > Number(element.style.height.replace(/px/,''))) {
  //             return true
  //         } else {
  //             return false
  //         }
  //     }        
  // }
}
if (kxv = document.getElementsByClassName('pureHTMLtimeline')[0]) {
  window.addEventListener('resize', scaleElementWidthToParent);
  setTimeout(() => {
      scaleElementWidthToParent(kxv);
      window.addEventListener('load', scaleElementWidthToParent);
  }, 5000);
}

// Select all elements with class "event_node"
var elements = document.querySelectorAll('.event_node');

// Convert NodeList to an array for easier manipulation
var elementsArrayTable = Array.from(elements);
console.log(elementsArrayTable);

// Filter out elements that don't meet the conditions
var filteredElements = elementsArrayTable.filter(function (element) {
    // Check if the element has tabindex="1" or has child nodes or has a text node as the first child
    return (
        element.getAttribute('tabindex') === '1' ||
        element.childElementCount > 0 ||
        (element.firstChild && element.firstChild.nodeType === 3 && element.firstChild.nodeValue.trim() !== '')
    );
});

// // Filter out elements without child elements that are elements
// filteredElements = filteredElements.filter(function (element) {
//   return Array.from(element.children).some(function (child) {
//       return child.nodeType === 1 || (child.nodeType === 3 && child.nodeValue.trim() !== '' && child.nodeValue.trim() !== '&nbsp;');
//   });
// });

// Check if any qualifying elements are found
if (filteredElements.length > 0) {
    filteredElements.forEach(function (element) {
        element.style.height = 'auto';
    });
} else {
    console.error('No qualifying elements found');
}