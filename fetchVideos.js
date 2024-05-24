const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const keyFile = path.join(__dirname, 'service-account-key.json'); // Adjust this path if necessary
const scopes = ['https://www.googleapis.com/auth/youtube.force-ssl'];

async function getVideoIds() {
    const auth = new google.auth.GoogleAuth({
        keyFile,
        scopes
    });

    const service = google.youtube('v3');
    const authClient = await auth.getClient();

    const channelResponse = await service.channels.list({
        auth: authClient,
        part: 'contentDetails',
        mine: true
    });

    const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

    const videoResponse = await service.playlistItems.list({
        auth: authClient,
        part: 'contentDetails',
        playlistId: uploadsPlaylistId,
        maxResults: 50
    });

    const videoIds = videoResponse.data.items.map(item => item.contentDetails.videoId);

    // Write video IDs to a JSON file
    const filePath = path.join(__dirname, 'videoIds.json');
    fs.writeFileSync(filePath, JSON.stringify(videoIds, null, 2));
}

getVideoIds().catch(console.error);