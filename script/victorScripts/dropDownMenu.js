/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  document.getElementById("myDropdown").classList.toggle("slideIn");
  // myDropdown.classList.add('slideIn');
}
// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.Button')) {
    const myDropdown = document.querySelectorAll(".myDropdown, .myDropdown2");
    const elementsArray = [...myDropdown];
    elementsArray.forEach(element => {
      if (element.classList.contains('show')) {
        element.classList.remove('show');
        element.classList.remove('slideIn');
      }
    });
  }
}