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
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}`;
      
      // Optionally, display a loading indicator or message
      alert("Redirecting to Spotify for login...");
      
      window.location = authUrl;
    }
  }
};

export default Spotify;
