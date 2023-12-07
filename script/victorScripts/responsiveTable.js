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

// Select the elements with tabindex="1" and class="event_node"
var elements = document.querySelectorAll('.event_node[tabindex="1"]');
console.log(elements);
// Filter out elements without child nodes
var elementsWithChildren = Array.from(elements).filter(function (element) {
  return element.hasChildNodes();
});
// Check if the element is found
if (elementsWithChildren.length > 0) {
  elementsWithChildren.forEach(function (element) {
    element.style.height = 'auto';
  });
} else {
    console.error('Element not found');
}