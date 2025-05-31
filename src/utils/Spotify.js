let accessToken;
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // Check for token and expiration time in URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Validate token and expiration
      if (!accessToken || isNaN(expiresIn)) {
        console.error("Invalid Spotify access token or expiration time.");
        return null;
      }

      // Clear the token after expiration
      window.setTimeout(() => {
        accessToken = "";
        console.warn("Spotify access token has expired.");
      }, expiresIn * 1000);

      // Clean up the URL
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
      console.warn("Spotify access token not found. Redirecting to login...");

      // Redirect to Spotify for authorization
      const scopes = "playlist-modify-public";
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}`;

      // Optionally, display a loading indicator or message
      alert("Redirecting to Spotify for login...");

      window.location = authUrl;
    }
  },

  async search(term) {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      console.error("No access token available.");
      return [];
    }

    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
      term
    )}`;

    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.error("Spotify search failed:", response.statusText);
        return [];
      }

      const jsonResponse = await response.json();

      if (!jsonResponse.tracks) {
        return [];
      }

      // Convert tracks to simplified format
      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } catch (error) {
      console.error("Spotify search error:", error);
      return [];
    }
  },
};

export default Spotify;
