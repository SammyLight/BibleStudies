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

fetch('{{ site.baseurl }}/videoIds.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(videoIds => {
    const videoIdsList = document.getElementById('videoIdsList');
    videoIds.forEach(videoId => {
      const listItem = document.createElement('li');
      listItem.textContent = videoId;
      videoIdsList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error fetching videoIds:', error);
  });
