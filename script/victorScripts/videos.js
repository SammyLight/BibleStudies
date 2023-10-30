const firstBtn = document.querySelector(".videos-header-btns-cont button").classList.add('active');
const firstTab = document.querySelector(".videotab-content").classList.add('videotab-content--active');
const allBtns = document.querySelectorAll(".videos-header-btns-cont button");
const allTabs = document.querySelectorAll(".videotab-content");

allBtns.forEach((elem) => {
  elem.addEventListener('click', function() {
    const linkId = elem.id;

    allBtns.forEach((button) => {
      if (button.id === linkId) {
        button.classList.add("active");
      } else {
        button.classList.remove('active');
      }
    });
    allTabs.forEach((tab) => {
      if (tab.id === linkId + "-content") {
        tab.classList.add("videotab-content--active");  
      } else {
        tab.classList.remove('videotab-content--active');
      }
    });
  });
});
