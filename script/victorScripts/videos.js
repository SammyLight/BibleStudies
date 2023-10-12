const allBtns = document.querySelectorAll(".videos-header-btns-cont button");
const allTabs = document.querySelectorAll(".videotab-content");

allBtns.forEach((elem) => {
  elem.addEventListener('click', function() {
    const linkId = elem.id;
    const titleBtnClick = elem.title;

    allBtns.forEach((button) => {
      if (button.title == titleBtnClick){
        button.classList.add("active");
      } else {
        button.classList.remove('active');
      }
    });

    allTabs.forEach((tab) => {
      if (tab.id.includes(linkId)) {
        tab.classList.add("videotab-content--active");  
      } else {
        tab.classList.remove('videotab-content--active');
      }
    });
  });
});