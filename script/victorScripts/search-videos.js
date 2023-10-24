const videoSearchInput = document.getElementById("videoSearch");
const searchResultsContainer = document.getElementById("searchResults");
const displayedVideos = new Set();
videoSearchInput.addEventListener("input", handleVideoSearch);
function handleVideoSearch() {
  const searchQuery = videoSearchInput.value.toLowerCase();
  const embeddedVideos = document.querySelectorAll("lite-youtube");
  searchResultsContainer.innerHTML = "";
  displayedVideos.clear();
  embeddedVideos.forEach((video) => {
    const videoDescriptionElement = video.querySelector(".chaNamAndVideoTitle");
    const videoTitleElement = video.querySelector(".moving-text");
    const videoId = video.getAttribute("videoid");
    if (videoTitleElement) {
      const videoTitle = videoTitleElement.textContent.toLowerCase();
      if (videoTitle.includes(searchQuery) && !displayedVideos.has(videoId)) {
        // Clone the embedded video element
        const videoClone = video.cloneNode(true);
         // Remove duplicate child elements in the clone
        const duplicateVideoDescriptionElements = videoClone.querySelectorAll(".chaNamAndVideoTitle");
        duplicateVideoDescriptionElements.forEach((el) => {
          if (el !== videoDescriptionElement) {
            el.remove();
          }
        });
        const createNewVideoBox = document.createElement("div");
        createNewVideoBox.classList.add('video-box', 'homeResources-grid-containter');
        const createNewIframeContainer = document.createElement("div");
        createNewIframeContainer.classList.add('iframe-container');
        createNewIframeContainer.appendChild(videoClone);
        createNewVideoBox.appendChild(createNewIframeContainer);
        searchResultsContainer.appendChild(createNewVideoBox);
        displayedVideos.add(videoId);
      }
    }
  });
  // If the search input is empty, clear the displayed videos
  if (searchQuery === "") {
    searchResultsContainer.innerHTML = "";
    displayedVideos.clear();
  }
}