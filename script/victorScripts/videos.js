const firstBtn = document.querySelector(".videos-header-btns-cont button").classList.add('active');
const firstTab = document.querySelector(".videotab-content").classList.add('videotab-content--active');
const allBtns = document.querySelectorAll(".videos-header-btns-cont button");
const allTabs = document.querySelectorAll(".videotab-content");

document.addEventListener("DOMContentLoaded", function () {
// Run the first part of the code
  runFirstPartOfCode();
  setTimeout(function () {
    const tab1Content = document.querySelector('#tab1-content');
    // Create an array to store all video boxes from all tabs
    const allVideoBoxes = [];
    let latestVideoBox;
    let latestDate = new Date(0); // Initialize with a very early date
    let tabOfLatestVideoBox;
    let previousVideoBoxOne;
    let previousDateOne;
    let tabOfpreviousVideoBoxOne;
    let previousVideoBoxTwo;
    let previousDateTwo;
    let tabOfpreviousVideoBoxTwo;
    let previousVideoBoxThree;
    let previousDateThree;
    let tabOfpreviousVideoBoxThree;    
    // Assuming allTabs is a NodeList or an array of tabs
    Array.from(allTabs).slice(1).forEach((tab) => {
      const linkId = tab.id;
      // Retrieve all video boxes for the current tab
      const allVideoBox = document.querySelectorAll(`#${linkId} .video-box`);
      // Push video boxes into the array
      allVideoBoxes.push(...allVideoBox);
      // Iterate over video boxes for the current tab
      allVideoBoxes.forEach((videoBox) => {
        const dateAttribute = videoBox.getAttribute('date-posted');
        const currentDate = new Date(dateAttribute.replace(/(\d{1,2})(st|nd|rd|th)?/, '$1'));
        // Check if the current video box has a later date than the latest one
        if (currentDate > latestDate) {
          // Update the latest video box information
          previousVideoBoxThree = previousVideoBoxTwo;
          previousDateThree = previousDateTwo;
          tabOfpreviousVideoBoxThree = tabOfpreviousVideoBoxTwo;

          previousVideoBoxTwo = previousVideoBoxOne;
          previousDateTwo = previousDateOne;
          tabOfpreviousVideoBoxTwo = tabOfpreviousVideoBoxOne;
    
          previousVideoBoxOne = latestVideoBox;
          previousDateOne = latestDate;
          tabOfpreviousVideoBoxOne = tabOfLatestVideoBox;
    
          latestDate = currentDate;
          latestVideoBox = videoBox;
          tabOfLatestVideoBox = tab;
        } else if (currentDate > previousDateOne && currentDate < latestDate) {
          // Update the previous video box information
          previousVideoBoxThree = previousVideoBoxTwo;
          previousDateThree = previousDateTwo;
          tabOfpreviousVideoBoxThree = tabOfpreviousVideoBoxTwo;

          previousVideoBoxTwo = previousVideoBoxOne;
          previousDateTwo = previousDateOne;
          tabOfpreviousVideoBoxTwo = tabOfpreviousVideoBoxOne;
    
          previousDateOne = currentDate;
          previousVideoBoxOne = videoBox;
          tabOfpreviousVideoBoxOne = tab;
        } else if (currentDate > previousDateTwo && currentDate < previousDateOne && currentDate < latestDate) {
          // Update the previous video box information
          previousVideoBoxThree = previousVideoBoxTwo;
          previousDateThree = previousDateTwo;
          tabOfpreviousVideoBoxThree = tabOfpreviousVideoBoxTwo;
          
          previousDateTwo = currentDate;
          previousVideoBoxTwo = videoBox;
          tabOfpreviousVideoBoxTwo = tab;
        } else if (currentDate > previousDateThree && currentDate < previousDateTwo && currentDate < previousDateOne && currentDate < latestDate) {
          // Update the previous video box information
          previousDateThree = currentDate;
          previousVideoBoxThree = videoBox;
          tabOfpreviousVideoBoxThree = tab;
        }
      });
    });
    console.log(latestVideoBox);
    console.log(tabOfLatestVideoBox);

    console.log(previousVideoBoxOne);
    console.log(tabOfpreviousVideoBoxOne);

    console.log(previousVideoBoxTwo);
    console.log(tabOfpreviousVideoBoxTwo);

    console.log(previousVideoBoxThree);    
    console.log(tabOfpreviousVideoBoxThree);

    let moved = false; // Flag to track whether the buttons have been moved
    const btnArray = Array.from(allBtns);
    // Iterate over buttons
    for (let elem of btnArray.slice(1)) {
      let btnId = elem.id;
      let theButtonMatch;
      // Check for tabOfPreviousVideoBoxThree condition
      if (tabOfpreviousVideoBoxThree) {
        const parentOfPreviousVideoBoxThree = previousVideoBoxThree.parentNode;
        const parentOfPreviousVideoBoxThreeId = parentOfPreviousVideoBoxThree.id;
        if (parentOfPreviousVideoBoxThreeId.includes(btnId)) {
          // console.log(btnId);
          theButtonMatch = elem;
          // console.log(theButtonMatch);
          theButtonMatch = btnArray.find((elem) => elem.id === theButtonMatch.id);
          const indexToMove = btnArray.indexOf(theButtonMatch);
          if (indexToMove !== -1) {
            // console.log(indexToMove);
            const movedElement = btnArray.splice(indexToMove, 1)[0];
            // console.log(movedElement);
            btnArray.splice(4, 0, movedElement);
            moved = true; // Set the flag to true
          }
        }
      }
      // Check for tabOfPreviousVideoBoxTwo condition
      if (tabOfpreviousVideoBoxTwo) {
        const parentOfPreviousVideoBoxTwo = previousVideoBoxTwo.parentNode;
        const parentOfPreviousVideoBoxTwoId = parentOfPreviousVideoBoxTwo.id;
        if (parentOfPreviousVideoBoxTwoId.includes(btnId)) {
          theButtonMatch = elem;
          // console.log(theButtonMatch);
          theButtonMatch = btnArray.find((elem) => elem.id === theButtonMatch.id);
          const indexToMove = btnArray.indexOf(theButtonMatch);
          if (indexToMove !== -1) {
            const movedElement = btnArray.splice(indexToMove, 1)[0];
            btnArray.splice(3, 0, movedElement);
            moved = true; // Set the flag to true
          }
        }
      }
      // Check for tabOfPreviousVideoBoxOne condition
      if (tabOfpreviousVideoBoxOne) {
        const parentOfPreviousVideoBoxOne = previousVideoBoxOne.parentNode;
        const parentOfPreviousVideoBoxOneId = parentOfPreviousVideoBoxOne.id;
        if (parentOfPreviousVideoBoxOneId.includes(btnId)) {
          theButtonMatch = elem;
          theButtonMatch = btnArray.find((elem) => elem.id === theButtonMatch.id);
          const indexToMove = btnArray.indexOf(theButtonMatch);
          if (indexToMove !== -1) {
            const movedElement = btnArray.splice(indexToMove, 1)[0];
            btnArray.splice(2, 0, movedElement);
            moved = true; // Set the flag to true
          }
        }
      }
      // Check for tabOfLatestVideoBox condition
      if (tabOfLatestVideoBox) {
        const parentOfLatestVideoBox = latestVideoBox.parentNode;
        const parentOfLatestVideoBoxId = parentOfLatestVideoBox.id;
        if (parentOfLatestVideoBoxId.includes(btnId)) {
          theButtonMatch = elem;
          theButtonMatch = btnArray.find((elem) => elem.id === theButtonMatch.id);
          const indexToMove = btnArray.indexOf(theButtonMatch);
          if (indexToMove !== -1) {
            const movedElement = btnArray.splice(indexToMove, 1)[0];
            btnArray.splice(1, 0, movedElement);
            moved = true; // Set the flag to true
          }
        }
      }
    }
    // Remove existing buttons from the DOM and insert buttons in the updated order
    if (moved) {
      const parentElement = document.querySelector('.videos-header-btns-cont');
      // Remove existing buttons from the DOM
      document.querySelectorAll('.videos-header-btns').forEach((button) => {
        button.remove();
      });
      // Insert buttons in the updated order
      btnArray.forEach((button) => {
        parentElement.appendChild(button);
      });
    } 
    // Sort all video boxes based on date
    allVideoBoxes.sort((boxA, boxB) => {
      const dateAString = boxA.getAttribute('date-posted');
      const dateBString = boxB.getAttribute('date-posted');
      // Convert date strings into a format that can be compared
      const dateA = new Date(dateAString.replace(/(\d{1,2})(st|nd|rd|th)?/, '$1'));
      const dateB = new Date(dateBString.replace(/(\d{1,2})(st|nd|rd|th)?/, '$1'));
      return dateA - dateB;
    });
    // Reverse the order of the sorted video boxes
    allVideoBoxes.reverse();
    // Append sorted video boxes to the first tab
    allVideoBoxes.forEach((videoBox) => {
      const clonedVideoBox = videoBox.cloneNode(true);
      tab1Content.appendChild(clonedVideoBox);
    });      
    // Check for video boxes with the same date in the first tab
    const tab1VideoBoxes = tab1Content.querySelectorAll('.video-box');
    // Create an object to store dates and corresponding video boxes
    const datesMap = {};
    tab1VideoBoxes.forEach((videoBox) => {
      const date = videoBox.getAttribute('date-posted');
      if (datesMap[date]) {
        // Handle the video boxes with the same date in the first tab
        datesMap[date].setAttribute('same-date', 'swappedfrom 2-1');
        videoBox.setAttribute('same-date', 'swappedfrom 1-2');// setting attributes has not effect on the code, this is just for me.  
        // Swap positions in the DOM
        tab1Content.removeChild(videoBox);// this is the current videoBox
        // Insert the video box (swap1-2) before the existing element datesMap[date] (swap2-1)
        tab1Content.insertBefore(videoBox, datesMap[date]);
      } else {
        // Store the reference to the video box for the date
        datesMap[date] = videoBox;
      }
    });
  }, 2100);

  // Convert allTabs to an array using Array.from or the spread operator
  const tabsArrayAll = Array.from(allTabs);
  const tabsArrayFirst = tabsArrayAll.length > 0 ? [tabsArrayAll[0]] : [];
  const tabsArray = tabsArrayAll.slice(1);

  allBtns.forEach((elem) => {
    const linkId = elem.id;

    // Define a function to handle the setTimeout callback
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
      if (tabsArrayFirst) {
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
    setTimeout(updateButton, 2250);

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
});

// allBtns.forEach((elem) => {
//   elem.addEventListener('click', function() {
//     const linkId = elem.id;

//     allBtns.forEach((button) => {
//       if (button.id === linkId) {
//         button.classList.add("active");
//       } else {
//         button.classList.remove('active');
//       }
//     });
//     allTabs.forEach((tab) => {
//       if (tab.id === linkId + "-content") {
//         tab.classList.add("videotab-content--active");  
//       } else {
//         tab.classList.remove('videotab-content--active');
//       }
//     });
//   });
// });

// // Create an array to store all video boxes from all tabs
// const allVideoBoxes = [];
// let latestVideoBox;
// let latestDate = new Date(0); // Initialize with a very early date
// let tabOfLatestVideoBox;
// const previousVideoBoxes = [];
// const previousDates = [];
// const tabOfPreviousVideoBoxes = [];

// // Assuming allTabs is a NodeList or an array of tabs
// Array.from(allTabs).slice(1).forEach((tab) => {
//   const linkId = tab.id;
//   // Retrieve all video boxes for the current tab
//   const allVideoBox = document.querySelectorAll(`#${linkId} .video-box`);
//   // Push video boxes into the array
//   allVideoBoxes.push(...allVideoBox);

//   // Iterate over video boxes for the current tab
//   allVideoBox.forEach((videoBox) => {
//     const dateAttribute = videoBox.getAttribute('date-posted');
//     const currentDate = new Date(dateAttribute.replace(/(\d{1,2})(st|nd|rd|th)?/, '$1'));

//     if (currentDate > latestDate) {
//       // Update the latest video box information
//       previousVideoBoxes[2] = previousVideoBoxes[1];
//       previousDates[2] = previousDates[1];
//       tabOfPreviousVideoBoxes[2] = tabOfPreviousVideoBoxes[1];

//       previousVideoBoxes[1] = previousVideoBoxes[0];
//       previousDates[1] = previousDates[0];
//       tabOfPreviousVideoBoxes[1] = tabOfPreviousVideoBoxes[0];

//       previousVideoBoxes[0] = latestVideoBox;
//       previousDates[0] = latestDate;
//       tabOfPreviousVideoBoxes[0] = tabOfLatestVideoBox;

//       latestDate = currentDate;
//       latestVideoBox = videoBox;
//       tabOfLatestVideoBox = tab;
//     } else {
//       findPreviousVideoBox(currentDate, videoBox, tab); // Pass 'tab' as a parameter
//     }
//   });
// });

// // Function to find the previous video box
// function findPreviousVideoBox(currentDate, videoBox, tab) {
//   for (let i = 0; i < previousVideoBoxes.length; i++) {
//     if (currentDate > previousDates[i] && currentDate < latestDate) {
//       // Update the previous video box information
//       previousVideoBoxes[i + 1] = previousVideoBoxes[i];
//       previousDates[i + 1] = previousDates[i];
//       tabOfPreviousVideoBoxes[i + 1] = tabOfPreviousVideoBoxes[i];

//       previousDates[i] = currentDate;
//       previousVideoBoxes[i] = videoBox;
//       tabOfPreviousVideoBoxes[i] = tab;
//     }
//   }
// }
// // Now, you have the information in the arrays previousVideoBoxes, previousDates, and tabOfPreviousVideoBoxes.

// // Now, `previousVideoBox` contains the video box with the date immediately preceding `latestDate` and not equal to it
//     console.log(latestVideoBox);
//     console.log(tabOfLatestVideoBox);

//     console.log(previousVideoBoxes[0]);
//     console.log(tabOfPreviousVideoBoxes[0]);

//     console.log(previousVideoBoxes[1]);
//     console.log(tabOfPreviousVideoBoxes[1]);

//     console.log(previousVideoBoxes[2]);    
//     console.log(tabOfPreviousVideoBoxes[2]);
