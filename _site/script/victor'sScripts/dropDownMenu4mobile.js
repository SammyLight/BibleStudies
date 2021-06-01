// function toggle() {
//   var n = document.getElementById("headerLinks");
// if (n.style.display != 'block') 
//   {
//   n.style.display = 'block';
//     // document.getElementById(id2).setAttribute('aria-expanded', 'false');
// }
// else
// {
// n.style.display = 'none';
// // document.getElementById(id2).setAttribute('aria-expanded', 'true');
//   }
// }
// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('headerLinks');
  window.onclick = function(event) {
    if (event.target == modal) {
         modal.style.display = "none";
   }
}