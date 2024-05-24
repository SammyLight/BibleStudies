/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


  // //TO SHOW QUESTION HINT
// var showHint;
// var closeHint = document.createElement("SPAN");
// closeHint.classList.add('closeHint');
// closeHint.innerText = 'x';
// closeHint.addEventListener('click', closeHintt);

// var showHintParent = document.createElement("DIV");
// showHintParent.classList.add('showHintParent');

// var hintParent;

// function showHintt() {;
//     showHint = currentQuestion.children[0];
//     if (showHint.tagName == "EM") {
//         if (showHint.className == "") {
//             showHint.className = "showHintCSS";
//           } else {
//             showHint.className = "";
//           }
//         showHint.prepend(closeHint);
//     }
//     if (hintParent = showHint.parentElement){
//         hintParent.prepend(showHintParent);
//     } 
//     showHintParent.append(showHint);
// }
// //TO HIDE QUESTION HINT
// function closeHintt() {
//     var removedParent = showHint.parentElement;
//     removedParent.replaceWith(...showHint.parentElement.childNodes);
//     if (showHint.className == "showHintCSS") {
//         showHint.className = "";
//       } 
// }
//Click anywhere to close hint
// document.addEventListener('mouseup', function(e) {
//     var container = showHintParent;
//     if (!container.contains(e.target)) {
//         if (container.className == "showHintParent") {
//             container.className = "hide";
//           }
//     }
// });