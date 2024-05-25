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

  const baseUrl = '{{ site.baseurl }}';
  const fetchUrl = baseUrl ? `${baseUrl}/Videos/videoIds.json` : '/Videos/videoIds.json';

  console.log('Fetching from URL:', fetchUrl);

  fetch(fetchUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
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
      console.error('Error fetching video IDs:', error);
    });
