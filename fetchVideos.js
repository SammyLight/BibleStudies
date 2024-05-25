const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Ensure you set this environment variable
const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const scopes = ['https://www.googleapis.com/auth/youtube.force-ssl'];

async function getVideoIds() {
    const auth = new google.auth.GoogleAuth({
        keyFile,
        scopes
    });

    const service = google.youtube('v3');
    const authClient = await auth.getClient();

    // Fetch the uploads playlist ID
    const channelResponse = await service.channels.list({
        auth: authClient,
        part: 'contentDetails',
        mine: true
    });

    const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
    let videoIds = [];
    let nextPageToken = '';

    // Fetch all video IDs, handle pagination
    do {
        const videoResponse = await service.playlistItems.list({
            auth: authClient,
            part: 'contentDetails',
            playlistId: uploadsPlaylistId,
            maxResults: 50,
            pageToken: nextPageToken
        });

        videoIds = videoIds.concat(videoResponse.data.items.map(item => item.contentDetails.videoId));
        nextPageToken = videoResponse.data.nextPageToken;

    } while (nextPageToken);

    // Write video IDs to a JSON file
    const filePath = path.join(__dirname, 'videoIds.json');
    fs.writeFileSync(filePath, JSON.stringify(videoIds, null, 2));

    console.log(`Video IDs fetched and saved to ${filePath}`);
}

getVideoIds().catch(console.error);
