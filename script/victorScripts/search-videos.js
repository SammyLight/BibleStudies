const videoSearchInput = document.getElementById("videoSearch");
const searchResultsContainer = document.getElementById("searchResults");
const searchFromTab1Content = document.querySelector('#tab1-content');
const displayedVideos = new Set();
let debounceTimer;
let observer;
// Event listener for highlighting
videoSearchInput.addEventListener("input", () => {
    const searchQuery = videoSearchInput.value.toLowerCase();
    handleHighLight(searchQuery);
  });
// Event listener for handling video search
videoSearchInput.addEventListener("input", () => {
    handleVideoSearch();
});
// Function to handle video highlight
function handleHighLight(searchQuery) {
    // Disconnect the observer if it's already connected
    if (observer) {
        observer.disconnect();
    }
    const videoBoxes = searchResultsContainer.querySelectorAll(".video-box");
    videoBoxes.forEach((video) => {
        const videoTitleElement = video.querySelector(".video-title");
        var modifiedText;
        var videoDate;
        // Extract the date from the video title
        const videoTitleText = videoTitleElement.textContent;
        // Regular expression for the first date format: "23rd Dec. 2023"
        const firstDateFormatMatch = videoTitleText.match(/(\d{1,2}(?:st|nd|rd|th)?)\s?(\w{3})\.\s?(\d{4})\.?/);
        // Regular expression for the second date format: "Sun, Dec 24, 2023."
        const secondDateFormatMatch = videoTitleText.match(/(?:\w{3},\s)?(\w{3})\s(\d{1,2}),\s(\d{4})\.?/);
        // Check if a date match is found
        if (firstDateFormatMatch && firstDateFormatMatch.length > 0) {
            const [dayMatch, monthMatch, yearMatch] = firstDateFormatMatch.slice(1);
            const day = dayMatch || '';
            const month = monthMatch || '';
            const year = yearMatch || '';
            // Manually construct the date string in a format recognized by the Date constructor
            const dateString = `${month} ${day.replace(/\D/g, '')}, ${year}`;
            const dateObject = new Date(dateString);
            // Check if the dateObject is valid
            if (!isNaN(dateObject)) {
                const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(dateObject);
                // Create a new text node with the modified text (excluding the date)
                modifiedText = document.createTextNode(videoTitleText.replace(secondDateFormatMatch[0], ''));
                // Create a new text node with the date (excluding the modified text)
                videoDate = document.createTextNode(dayOfWeek + ', ' + dateString + '.');
            } else {
                console.error('Invalid date object:', dateObject);
            }
        } else if (secondDateFormatMatch && secondDateFormatMatch.length > 0) {
            const [, monthMatch, dayMatch, yearMatch] = secondDateFormatMatch;
            const day = dayMatch || '';
            const month = monthMatch || '';
            const year = yearMatch || '';
            const dateString = `${month} ${day}, ${year}`;
            const dateObject = new Date(dateString);
            // Check if the dateObject is valid
            if (!isNaN(dateObject)) {
                const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(dateObject);
                // Create a new text node with the modified text (excluding the date)
                modifiedText = document.createTextNode(videoTitleText.replace(secondDateFormatMatch[0], ''));
                // Create a new text node with the date (excluding the modified text)
                videoDate = document.createTextNode(dayOfWeek + ', ' + dateString + '.');
            } else {
                console.error('Invalid date object:', dateObject);
            }
        } else {
            // No match for either format
            console.error('No date match found');
        }
        if (videoTitleElement) {
            // Use modifiedText instead of originalVideo
            const highlightedTitle = modifiedText.textContent.replace(
                new RegExp(searchQuery, "gi"),
                (match) => `<span class="highlighted">${match}</span>`
            );
            const highlightedTitleElement = document.createElement('span');
            highlightedTitleElement.innerHTML = highlightedTitle;
            // Clear the existing content in videoTitleElement
            videoTitleElement.innerHTML = '';
            // Append the highlightedTitle and videoDate to videoTitleElement
            videoTitleElement.innerHTML = highlightedTitle;
            // Highlight the date and append it to videoTitleElement
        if (videoDate) {
            const highlightedDate = videoDate.textContent.replace(
                new RegExp(searchQuery, "gi"),
                (match) => `<span class="highlighted">${match}</span>`
            );
            const highlightedDateElement = document.createElement('span');
            highlightedDateElement.classList.add('video-date');
            highlightedDateElement.innerHTML = highlightedDate;
            videoTitleElement.appendChild(highlightedDateElement);
        }
        }
    });
    // Create the observer if it doesn't exist
    if (!observer) {
        observer = new MutationObserver(() => {
            handleHighLight(videoSearchInput.value.toLowerCase());
        });
    }
    // Reconnect the observer to detect further changes
    observer.observe(searchResultsContainer, { childList: true, subtree: true, attributes: true });
}
// Function to handle video search
function handleVideoSearch() {
    const searchQuery = videoSearchInput.value.toLowerCase();
    searchResultsContainer.innerHTML = "";
    displayedVideos.clear();
    const videoBoxes = searchFromTab1Content.querySelectorAll(".video-box");
    videoBoxes.forEach((video) => {
        const videoTitleElement = video.getAttribute("video-title");
        const videoIdElement = video.querySelector("lite-youtube");
        const videoId = videoIdElement.getAttribute("videoid");
        if (videoTitleElement) {
            const originalVideoTitle = videoTitleElement;
            const videoTitle = originalVideoTitle.toLowerCase();
            if (videoTitle.includes(searchQuery) && !displayedVideos.has(videoId)) {
                const videoClone = video.cloneNode(true);
                searchResultsContainer.appendChild(videoClone);
                displayedVideos.add(videoId);
            }
        }
    });
    const displayedVideoCount = searchResultsContainer.children.length;
    const displayedVideoCountElement = document.createElement('div');
    displayedVideoCountElement.classList.add('displayedVideoCountElement');
    displayedVideoCountElement.style.paddingTop = '6px';
    displayedVideoCountElement.style.position = 'absolute';
    if (displayedVideoCount === 0) {
        displayedVideoCountElement.innerHTML = 'Search Results: No match found...';
    } else {
        displayedVideoCountElement.innerHTML = 'Search Results: ' + displayedVideoCount;
    }
    searchResultsContainer.prepend(displayedVideoCountElement);
    searchResultsContainer.style.paddingTop = displayedVideoCount === 0 ? '30px' : '40px';
    if (searchQuery === "") {
        searchResultsContainer.style.paddingTop = '0';
        searchResultsContainer.innerHTML = "";
        displayedVideos.clear();
    }
}
