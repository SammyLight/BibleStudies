var coll = document.getElementsByClassName("collapsible");
var caretID = document.getElementById('caretID');
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      caretID.classList.add('caret');
      caretID.classList.remove('caret2');
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      caretID.classList.remove('caret');
      caretID.classList.add('caret2');
    }
  });
}