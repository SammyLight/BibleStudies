// Get references to the search input and search results container
const videoSearchInput = document.getElementById("videoSearch");
const searchResultsContainer = document.getElementById("searchResults");
const searchFromTab1Content = document.querySelector('#tab1-content');
// Create a Set to keep track of displayed videos to avoid duplicates
const displayedVideos = new Set();
// Add an event listener to the search input for handling video search
videoSearchInput.addEventListener("input", handleVideoSearch);
// Function to handle video search
function handleVideoSearch() {
  // Get the lowercase search query from the input
  const searchQuery = videoSearchInput.value.toLowerCase();
  // Get all video-box elements (or lite-youtube elements, depending on your actual use case)
  const videoBoxes = searchFromTab1Content.querySelectorAll(".video-box");
  // Clear the search results container and reset the displayed videos set
  searchResultsContainer.innerHTML = "";
  displayedVideos.clear();

  // Loop through each videoBox element
  videoBoxes.forEach((video) => {
    // Get the values of video-title and videoid attributes
    const videoTitleElement = video.getAttribute("video-title");
    const videoIdElement = video.querySelector("lite-youtube");
    const videoId = videoIdElement.getAttribute("videoid");

    // Check if videoTitleElement has a value
    if (videoTitleElement) {
      // Convert video title to lowercase for case-insensitive comparison
      const originalVideoTitle = videoTitleElement; // Store the original title
      const videoTitle = originalVideoTitle.toLowerCase();
      // let displayedVideoCount = 0;
      // Check if the video title includes the search query and the video hasn't been displayed
      if (videoTitle.includes(searchQuery) && !displayedVideos.has(videoId)) {    
        // Clone the videoBox element
        const videoClone = video.cloneNode(true);
      //   // Create a modified version of the video title with the matched part highlighted
      // const highlightedTitle = originalVideoTitle.replace(
      //   new RegExp(searchQuery, "gi"),
      //   (match) => `<span class="highlighted">${match}</span>`
      // );
      // // Find the .video-title element in the cloned video box
      // const videoCloneTitle = videoClone.querySelector('.video-title');

      // // Clear existing content inside .video-title
      // videoCloneTitle.innerHTML = '';

      // // Create a DocumentFragment to safely append the highlighted content
      // const fragment = document.createDocumentFragment();

      // // Iterate through the nodes in the highlightedTitle string
      // const tempDiv = document.createElement('div');
      // tempDiv.innerHTML = highlightedTitle;
      // while (tempDiv.firstChild) {
      //   fragment.appendChild(tempDiv.firstChild);
      // }

      // // Append the DocumentFragment to the .video-title element
      // videoCloneTitle.appendChild(fragment);

      searchResultsContainer.appendChild(videoClone);
        // Add the videoId to the displayed videos set to avoid duplicates
        displayedVideos.add(videoId);
      }
    }
  });
  // The displayed video count
  const displayedVideoCount = searchResultsContainer.children.length;

  // Create a div element to display the count
  const displayedVideoCountElement = document.createElement('div');
  displayedVideoCountElement.classList.add('displayedVideoCountElement');
  displayedVideoCountElement.style.paddingTop = '6px'
  displayedVideoCountElement.style.position = 'absolute'
  displayedVideoCountElement.innerHTML = 'Search Results: ' + displayedVideoCount;

  // Append the count element to the search results container
  searchResultsContainer.prepend(displayedVideoCountElement);
  searchResultsContainer.style.paddingTop = '36px'

  // If the search input is empty, clear the displayed videos
  if (searchQuery === "") {
    searchResultsContainer.style.paddingTop = '0'
    searchResultsContainer.innerHTML = "";
    displayedVideos.clear();
  }
}

// const videoSearchInput = document.getElementById("videoSearch");
// const searchResultsContainer = document.getElementById("searchResults");
// const displayedVideos = new Set();
// videoSearchInput.addEventListener("input", handleVideoSearch);
// function handleVideoSearch() {
//   const searchQuery = videoSearchInput.value.toLowerCase();
//   // const embeddedVideos = document.querySelectorAll("lite-youtube");
//   const embeddedVideos = document.querySelectorAll(".video-box");
//   searchResultsContainer.innerHTML = "";
//   displayedVideos.clear();
//   embeddedVideos.forEach((video) => {
//     const videoDescriptionElement = video.querySelector(".chaNameAndVideoTitle");
//     // const videoTitleElement = video.querySelector(".moving-text");
//     const videoTitleElement = video.getAttribute("video-title");
//     const videoId = video.getAttribute("videoid");
//     if (videoTitleElement) {
//       // const videoTitle = videoTitleElement.textContent.toLowerCase();
//       const videoTitle = videoTitleElement.toLowerCase();
//       if (videoTitle.includes(searchQuery) && !displayedVideos.has(videoId)) {
//         // Clone the embedded video element
//         const videoClone = video.cloneNode(true);
//          // Remove duplicate child elements in the clone
//         const duplicateVideoDescriptionElements = videoClone.querySelectorAll(".chaNameAndVideoTitle");
//         duplicateVideoDescriptionElements.forEach((el) => {
//           if (el !== videoDescriptionElement) {
//             el.remove();
//           }
//         });
//         const createNewVideoBox = document.createElement("div");
//         createNewVideoBox.classList.add('video-box', 'homeResources-grid-containter');
//         const createNewIframeContainer = document.createElement("div");
//         createNewIframeContainer.classList.add('iframe-container');
//         createNewIframeContainer.appendChild(videoClone);
//         createNewVideoBox.appendChild(createNewIframeContainer);
//         searchResultsContainer.appendChild(createNewVideoBox);
//         displayedVideos.add(videoId);
//       }
//     }
//   });
//   // If the search input is empty, clear the displayed videos
//   if (searchQuery === "") {
//     searchResultsContainer.innerHTML = "";
//     displayedVideos.clear();
//   }
// }
