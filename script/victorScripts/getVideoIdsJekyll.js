fetch('{{ site.baseurl }}/videoIds.json')
.then(response => response.json())
.then(videoIds => {
  const videoIdsList = document.getElementById('videoIdsList');
  videoIds.forEach(videoId => {
    const listItem = document.createElement('li');
    listItem.textContent = videoId;
    videoIdsList.appendChild(listItem);
  });
});