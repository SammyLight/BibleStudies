// fetch('{{ site.baseurl }}/videoIds.json')
// .then(response => response.json())
// .then(videoIds => {
//   const videoIdsList = document.getElementById('videoIdsList');
//   videoIds.forEach(videoId => {
//     const listItem = document.createElement('li');
//     listItem.textContent = videoId;
//     videoIdsList.appendChild(listItem);
//   });
// });

console.log('Fetching from URL:', '{{ site.baseurl }}/videoIds.json');

fetch('{{ site.baseurl }}/videoIds.json')
  .then(response => {
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(videoIds => {
    console.log('Fetched video IDs:', videoIds);
    const videoIdsList = document.getElementById('videoIdsList');
    videoIds.forEach(videoId => {
      const listItem = document.createElement('li');
      listItem.textContent = videoId;
      videoIdsList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error fetching video IDs:', error);
  });
