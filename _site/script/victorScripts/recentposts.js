var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    var caretID = this.lastElementChild;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      caretID.classList.add('fa-caret-right');
      caretID.classList.remove('fa-caret-down');
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      caretID.classList.remove('fa-caret-right');
      caretID.classList.add('fa-caret-down');
    }
  });
}


