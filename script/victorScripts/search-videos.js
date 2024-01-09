// Get references to the search input and search results container
const videoSearchInput = document.getElementById("videoSearch");
const searchResultsContainer = document.getElementById("searchResults");
const searchFromTab1Content = document.querySelector('#tab1-content');
// Create a Set to keep track of displayed videos to avoid duplicates
const displayedVideos = new Set();
// Add an event listener to the search input for handling video search
videoSearchInput.addEventListener("input", () => handleVideoSearch());

// Add another event listener for highlighting
videoSearchInput.addEventListener("input", () => {
  const searchQuery = videoSearchInput.value.toLowerCase();
  handleHightlight(searchQuery);
});

// // Function to handle video search
// function handleVideoSearch() {
//   // Get the lowercase search query from the input
//   const searchQuery = videoSearchInput.value.toLowerCase();
//   // Get all video-box elements (or lite-youtube elements, depending on your actual use case)
//   const videoBoxes = searchFromTab1Content.querySelectorAll(".video-box");
//   // Clear the search results container and reset the displayed videos set
//   searchResultsContainer.innerHTML = "";
//   displayedVideos.clear();

//   // Loop through each videoBox element
//   videoBoxes.forEach((video) => {
//     // Get the values of video-title and videoid attributes
//     const videoTitleElement = video.getAttribute("video-title");
//     const videoIdElement = video.querySelector("lite-youtube");
//     const videoId = videoIdElement.getAttribute("videoid");

//     // Check if videoTitleElement has a value
//     if (videoTitleElement) {
//       // Convert video title to lowercase for case-insensitive comparison
//       const originalVideoTitle = videoTitleElement; // Store the original title
//       const videoTitle = originalVideoTitle.toLowerCase();
//       // let displayedVideoCount = 0;
//       // Check if the video title includes the search query and the video hasn't been displayed
//       if (videoTitle.includes(searchQuery) && !displayedVideos.has(videoId)) {    
//         // Clone the videoBox element
//         const videoClone = video.cloneNode(true);
//       searchResultsContainer.appendChild(videoClone);
//         // Add the videoId to the displayed videos set to avoid duplicates
//         displayedVideos.add(videoId);
//       }
//     }
//   });

//   // The displayed video count
//   const displayedVideoCount = searchResultsContainer.children.length;
//   // Create a div element to display the count
//   const displayedVideoCountElement = document.createElement('div');
//   displayedVideoCountElement.classList.add('displayedVideoCountElement');
//   displayedVideoCountElement.style.paddingTop = '6px'
//   displayedVideoCountElement.style.position = 'absolute'
//   if (displayedVideoCount === 0) {
//     displayedVideoCountElement.innerHTML = 'Search Results: No match found...';
//   } else {
//     displayedVideoCountElement.innerHTML = 'Search Results: ' + displayedVideoCount;
//   }
//   // Prepend the count element to the search results container
//   searchResultsContainer.prepend(displayedVideoCountElement);
//   // Adjust the padding based on the condition
//   searchResultsContainer.style.paddingTop = displayedVideoCount === 0 ? '30px' : '40px';
//   // If the search input is empty, clear the displayed videos
//   if (searchQuery === "") {
//     searchResultsContainer.style.paddingTop = '0'
//     searchResultsContainer.innerHTML = "";
//     displayedVideos.clear();
//   }
// }

function handleHightlight(searchQuery) {
  const videoBoxes = searchFromTab1Content.querySelectorAll(".video-box");
  // Create a document fragment to store the cloned video boxes
  const fragment = document.createDocumentFragment();
  videoBoxes.forEach((video) => {
    const videoTitleElement = video.getAttribute("video-title");
    if (videoTitleElement && videoTitleElement.toLowerCase().includes(searchQuery)) {
      const originalVideoTitle = videoTitleElement;
      const highlightedTitle = originalVideoTitle.replace(
        new RegExp(searchQuery, "i"),
        (match) => `<span class="highlighted">${match}</span>`
      );
      const videoClone = video.cloneNode(true);
      const videoCloneTitle = videoClone.querySelector('.video-title');
      videoCloneTitle.innerHTML = highlightedTitle;
      fragment.appendChild(videoClone);
      displayedVideos.add(videoTitleElement);
    }
  });
  // Clear the search results container only if there is a valid search query
  if (searchQuery) {
    searchResultsContainer.innerHTML = "";
    searchResultsContainer.appendChild(fragment);
    
    // The displayed video count
    const displayedVideoCount = searchResultsContainer.children.length;
    // Create a div element to display the count
    const displayedVideoCountElement = document.createElement('div');
    displayedVideoCountElement.classList.add('displayedVideoCountElement');
    displayedVideoCountElement.style.paddingTop = '6px';
    displayedVideoCountElement.style.position = 'absolute';
    if (displayedVideoCount === 0) {
      displayedVideoCountElement.innerHTML = 'Search Results: No match found...';
    } else {
      displayedVideoCountElement.innerHTML = 'Search Results: ' + displayedVideoCount;
    }  
    // Prepend the count element to the search results container
    searchResultsContainer.prepend(displayedVideoCountElement);  
    // Adjust the padding based on the condition
    searchResultsContainer.style.paddingTop = displayedVideoCount === 0 ? '30px' : '40px';
  } else if (searchQuery === "") {
      searchResultsContainer.style.paddingTop = '0'
      searchResultsContainer.innerHTML = "";
      displayedVideos.clear();
  }
}
// Use MutationObserver to detect changes and reapply highlighting
const observer = new MutationObserver(() => {
  handleHightlight(videoSearchInput.value.toLowerCase());
});
observer.observe(searchFromTab1Content, { childList: true, subtree: true });
