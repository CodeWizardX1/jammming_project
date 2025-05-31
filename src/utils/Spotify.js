import { generatePKCE } from "./PKCE";

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = "playlist-modify-public playlist-modify-private";

let accessToken = null;

const Spotify = {
  authorize() {
    const codeChallenge = generatePKCE(); // Generate PKCE challenge
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(
      scopes
    )}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    window.location = authUrl; // Redirect to Spotify login
  },

  async getAccessToken() {
    // Check if access token is already in sessionStorage
    accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      return accessToken;
    }

    // Look for authorization code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      console.warn(
        "No authorization code found. Redirecting to Spotify login..."
      );
      this.authorize();
      return null;
    }

    // Retrieve PKCE verifier
    const verifier = sessionStorage.getItem("pkce_verifier");
    if (!verifier) {
      console.error("PKCE verifier not found in session storage.");
      this.authorize(); // Start over if verifier is missing
      return null;
    }

    // Exchange authorization code for access token
    const body = new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      code_verifier: verifier,
    });

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      });

      if (!response.ok) {
        console.error(
          "Failed to exchange code for token:",
          response.statusText
        );
        this.authorize(); // Start over if exchange fails
        return null;
      }

      const data = await response.json();
      accessToken = data.access_token;
      sessionStorage.setItem("access_token", accessToken);
      window.history.replaceState({}, document.title, "/"); // Clean URL
      return accessToken;
    } catch (error) {
      console.error("Error during token exchange:", error);
      return null;
    }
  },

  async search(term) {
    const token = await this.getAccessToken();
    if (!token) {
      console.error("No valid access token. Cannot perform search.");
      return [];
    }

    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
      term
    )}`;
    try {
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        console.error("Spotify search failed:", response.statusText);
        return [];
      }

      const jsonResponse = await response.json();
      if (!jsonResponse.tracks) return [];

      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];
    }
  },
};

export default Spotify;
