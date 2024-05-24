const firstBtn = document.querySelector(".videos-header-btns-cont button").classList.add('active');
const firstTab = document.querySelector(".videotab-content").classList.add('videotab-content--active');
const allBtns = document.querySelectorAll(".videos-header-btns-cont button");
const allTabs = document.querySelectorAll(".videotab-content");

  // Convert allTabs to an array using Array.from or the spread operator
  const tabsArrayAll = Array.from(allTabs);
  const tabsArrayFirst = tabsArrayAll.length > 0 ? [tabsArrayAll[0]] : [];
  const tabsArray = tabsArrayAll.slice(1);

  allBtns.forEach((elem) => {
      const linkId = elem.id;

      // // Define a function to handle the setTimeout callback
      function updateButton() {
          // Find the corresponding tab for the button
          const correspondingTab = tabsArray.find((tab) => tab.id === linkId + "-content");
          if (correspondingTab) {
              // Count the children of the corresponding tab
              const tabChildrenCount = correspondingTab.children.length;
              const tabChildrenCountElement = document.createElement('span');
              tabChildrenCountElement.classList.add('video-count');
              const countText = document.createTextNode(`(${tabChildrenCount})`);
              tabChildrenCountElement.appendChild(countText);

              // Get the original text from the data-original-text attribute, or fallback to current inner text
              const originalText = elem.getAttribute('data-original-text') || elem.innerText;
              elem.innerHTML = '';
              // Append the original text and the count element to the button
              elem.appendChild(document.createTextNode(originalText));
              elem.appendChild(tabChildrenCountElement);
          }
          // Find the corresponding tab for the button (for the first tab)
          if (tabsArrayFirst.length > 0) {
              const firstCorrespondingTab = tabsArrayFirst.find((tab) => tab.id === linkId + "-content");
              if (firstCorrespondingTab) {
                  // Count the children of the corresponding tab
                  const firstTabChildrenCount = firstCorrespondingTab.children.length;
                  const firstTabChildrenCountElement = document.createElement('span');
                  firstTabChildrenCountElement.classList.add('video-count');
                  const firstCountText = document.createTextNode(`(${firstTabChildrenCount})`);
                  firstTabChildrenCountElement.appendChild(firstCountText);

                  // Get the original text from the data-original-text attribute, or fallback to current inner text
                  const firstOriginalText = elem.getAttribute('data-original-text') || elem.innerText;
                  elem.innerHTML = '';
                  // Append the original text and the count element to the button
                  elem.appendChild(document.createTextNode(firstOriginalText));
                  elem.appendChild(firstTabChildrenCountElement);
              }
          }
      }
      setTimeout(updateButton, 3255);

      elem.addEventListener('click', function() {
          allBtns.forEach((button) => {
              if (button.id === linkId) {
                  button.classList.add("active");
              } else {
                  button.classList.remove('active');
              }
          });

          tabsArrayAll.forEach((tab) => {
              if (tab.id === linkId + "-content") {
                  tab.classList.add("videotab-content--active");
              } else {
                  tab.classList.remove('videotab-content--active');
              }
          });
      });
  });

  // Right and Left arrows for scrolling
  const btnsContainer = document.querySelector('.videos-header-cont');
  const btnsContainerInner = document.querySelector('.videos-header-btns-cont');
  let arrowIndicatorRight;
  let arrowIndicatorLeft;
  let scrollSpeed = 200; // Adjust the scroll speed as needed
  let isAnimating = false;

  function addArrowIndicatorLeft() {
      arrowIndicatorLeft = document.createElement('div');
      arrowIndicatorLeft.className = 'arrows arrow-left';
      arrowIndicatorLeft.innerHTML = `
          <div id="arrow-left-btn" style="fill: currentcolor;">
              <div class="arrow-btn-size">
                  <div style="width: 100%; height: 100%; fill: currentcolor;">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;">
                          <path d="M14.96 18.96 8 12l6.96-6.96.71.71L9.41 12l6.25 6.25-.7.71z"></path>
                      </svg>
                  </div>
              </div>
          </div>`;
      btnsContainer.appendChild(arrowIndicatorLeft);

      arrowIndicatorLeft.addEventListener('click', function () {
          if (!isAnimating) {
              smoothScroll(btnsContainerInner, -scrollSpeed);
          }
      });
  }

  function addArrowIndicatorRight() {
      arrowIndicatorRight = document.createElement('div');
      arrowIndicatorRight.className = 'arrows arrow-right';
      arrowIndicatorRight.innerHTML = `
          <div id="arrow-right-btn" style="fill: currentcolor;">
              <div class="arrow-btn-size">
                  <div style="width: 100%; height: 100%; fill: currentcolor;">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;">
                          <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path>
                      </svg>
                  </div>
              </div>
          </div>`;
      btnsContainer.appendChild(arrowIndicatorRight);

      arrowIndicatorRight.addEventListener('click', function () {
          if (!isAnimating) {
              smoothScroll(btnsContainerInner, scrollSpeed);
          }
      });
  }

  function removeArrowIndicators() {
      if (arrowIndicatorRight) {
          btnsContainer.removeChild(arrowIndicatorRight);
          arrowIndicatorRight = null;
      }
      if (arrowIndicatorLeft) {
          btnsContainer.removeChild(arrowIndicatorLeft);
          arrowIndicatorLeft = null;
      }
  }

  function checkOverflow() {
      const isOverflowRight = btnsContainerInner.scrollWidth > btnsContainerInner.clientWidth + btnsContainerInner.scrollLeft;
      const isOverflowLeft = btnsContainerInner.scrollLeft > 0;
      removeArrowIndicators();
      if (isOverflowRight) {
          addArrowIndicatorRight();
      }
      if (isOverflowLeft) {
          addArrowIndicatorLeft();
      }
  }

  checkOverflow();
  btnsContainerInner.addEventListener('scroll', function () {
      checkOverflow();
  });

  // Function for custom smooth scrolling
  function smoothScroll(element, distance) {
      const start = element.scrollLeft;
      const end = start + distance;
      const duration = 500; // Adjust the duration as needed
      let startTime;

      function scrollAnimation(currentTime) {
          if (!startTime) startTime = currentTime;

          const progress = currentTime - startTime;
          const easeInOut = 0.5 - 0.5 * Math.cos(Math.PI * progress / duration);

          element.scrollLeft = start + easeInOut * distance;

          if (progress < duration) {
              requestAnimationFrame(scrollAnimation);
          } else {
              isAnimating = false;
          }
      }

      isAnimating = true;
      requestAnimationFrame(scrollAnimation);
  }

