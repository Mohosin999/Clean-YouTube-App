const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function fetchYouTubePlaylist(prompt) {
  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error("❌ Missing YouTube API key. Check your .env file.");
    }

    const query = encodeURIComponent(prompt);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=playlist&key=${YOUTUBE_API_KEY}&maxResults=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      // Return the first playlist link
      const playlistId = data.items[0].id.playlistId;
      return `https://www.youtube.com/playlist?list=${playlistId}`;
    } else {
      return "No playlist found for this query.";
    }
  } catch (error) {
    console.error("YouTube API error:", error);
    throw error;
  }
}
