// const { google } = require('googleapis');

// // Replace 'YOUR_API_KEY' with your actual API key
// const apiKey = 'AIzaSyBQjKp7Xt5hFJHYwPCjM1wBXg6KBBZrayo';
// // Replace 'YOUR_CHANNEL_ID' with your actual channel ID
// const channelId = 'UCyyEJA1Q2c_xpSiUykXunNQ';

// const youtube = google.youtube({
//     version: 'v3',
//     auth: apiKey
// });

// async function getVideoIds() {
//     let videoIds = [];
//     try {
//         // Get the uploads playlist ID
//         let response = await youtube.channels.list({
//             part: 'contentDetails',
//             id: channelId
//         });
//         const uploadsPlaylistId = response.data.items[0].contentDetails.relatedPlaylists.uploads;

//         // Get video IDs from the uploads playlist
//         let nextPageToken = '';
//         do {
//             response = await youtube.playlistItems.list({
//                 part: 'contentDetails',
//                 playlistId: uploadsPlaylistId,
//                 maxResults: 50,
//                 pageToken: nextPageToken
//             });

//             response.data.items.forEach(item => {
//                 videoIds.push(item.contentDetails.videoId);
//             });

//             nextPageToken = response.data.nextPageToken;
//         } while (nextPageToken);

//         console.log(videoIds);
//     } catch (error) {
//         console.error('Error fetching video IDs:', error);
//     }
// }

// getVideoIds();


// function fetchVideoIds() {
//     gapi.client.init({
//         'apiKey': 'AIzaSyBQjKp7Xt5hFJHYwPCjM1wBXg6KBBZrayo'
//     }).then(function() {
//         return gapi.client.request({
//             'path': '/youtube/v3/channels',
//             'params': {
//                 'part': 'contentDetails',
//                 'id': 'UCyyEJA1Q2c_xpSiUykXunNQ'
//             }
//         });
//     }).then(function(response) {
//         const uploadsPlaylistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
//         return gapi.client.request({
//             'path': '/youtube/v3/playlistItems',
//             'params': {
//                 'part': 'contentDetails',
//                 'playlistId': uploadsPlaylistId,
//                 'maxResults': 50
//             }
//         });
//     }).then(function(response) {
//         const videoIds = response.result.items.map(item => item.contentDetails.videoId);
//         displayVideoIds(videoIds);
//     }, function(reason) {
//         console.error('Error fetching video IDs:', reason.result.error.message);
//     });
// }

// function displayVideoIds(videoIds) {
//     const videoIdsList = document.getElementById('videoIdsList');
//     videoIds.forEach(videoId => {
//         const listItem = document.createElement('li');
//         listItem.textContent = videoId;
//         videoIdsList.appendChild(listItem);
//     });
// }

// // Load the YouTube Data API client library
// gapi.load('client', fetchVideoIds);

const CLIENT_ID = '792419084813-hbo9mpift6eof75mqba9ddhfp1hkcefl.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBQjKp7Xt5hFJHYwPCjM1wBXg6KBBZrayo';
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];

let authorizeButton = document.getElementById('authorizeButton');

function handleClientLoad() {
    gapi.load('client', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS
    }).then(() => {
        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCredentialResponse
        });

        google.accounts.id.renderButton(
            authorizeButton,
            { theme: 'outline', size: 'large' }
        );

        authorizeButton.style.display = 'block';
    }).catch(error => {
        console.error('Error initializing Google API client:', error);
    });
}

function handleCredentialResponse(response) {
    // Decode the JWT token
    const user = jwt_decode(response.credential);

    // Make sure the user is signed in and obtain an access token
    const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
            if (response.error) {
                console.error('Error obtaining access token:', response.error);
            } else {
                fetchVideoIds(response.access_token);
            }
        }
    });

    tokenClient.requestAccessToken();
}

function fetchVideoIds(accessToken) {
    gapi.client.setToken({ access_token: accessToken });

    gapi.client.youtube.channels.list({
        part: 'contentDetails',
        mine: true
    }).then(response => {
        const uploadsPlaylistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
        return gapi.client.youtube.playlistItems.list({
            part: 'contentDetails',
            playlistId: uploadsPlaylistId,
            maxResults: 50
        });
    }).then(response => {
        const videoIds = response.result.items.map(item => item.contentDetails.videoId);
        displayVideoIds(videoIds);
    }).catch(error => {
        console.error('Error fetching video IDs:', error.result.error.message);
    });
}

function displayVideoIds(videoIds) {
    const videoIdsList = document.getElementById('videoIdsList');
    videoIdsList.innerHTML = '';
    videoIds.forEach(videoId => {
        const listItem = document.createElement('li');
        listItem.textContent = videoId;
        videoIdsList.appendChild(listItem);
    });
}

// Load the Google API client library and initialize the auth client
window.onload = handleClientLoad;