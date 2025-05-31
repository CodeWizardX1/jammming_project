const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = "playlist-modify-public playlist-modify-private";

let accessToken = null;

// Generate a random code verifier
function generateCodeVerifier(length = 128) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let verifier = "";
  for (let i = 0; i < length; i++) {
    verifier += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return verifier;
}

// Base64 encode helper
function base64encode(string) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Generate a code challenge from the verifier
async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return base64encode(digest);
}

const Spotify = {
  async authorize() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Save code verifier in session storage
    sessionStorage.setItem("code_verifier", codeVerifier);

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(
      scopes
    )}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    window.location = authUrl;
  },

  async getAccessToken() {
    accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      return accessToken;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      console.warn("No code found, redirecting to Spotify login...");
      await this.authorize();
      return null;
    }

    const codeVerifier = sessionStorage.getItem("code_verifier");
    if (!codeVerifier) {
      console.error("No code verifier found, restarting login...");
      await this.authorize();
      return null;
    }

    const body = new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
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
        await this.authorize();
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
      console.error("No valid token, cannot search.");
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
        console.error("Search failed:", response.statusText);
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
      console.error("Error in search:", error);
      return [];
    }
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      console.warn("Playlist name or tracks are missing.");
      alert("Playlist name or tracks are missing! Refresh the page and try again.")
      return;
    }

    const accessToken = await this.getAccessToken();
    if (!accessToken) {
      console.error("No access token. User needs to log in.");
      return;
    }

    try {
      // Step 1: Get user ID
      const userResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!userResponse.ok) {
        console.error("Failed to get user ID:", userResponse.statusText);
        return;
      }
      const userData = await userResponse.json();
      const userId = userData.id;

      // Step 2: Create a new playlist
      const createPlaylistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            description: "Created with Jammming",
            public: false,
          }),
        }
      );
      if (!createPlaylistResponse.ok) {
        console.error(
          "Failed to create playlist:",
          createPlaylistResponse.statusText
        );
        return;
      }
      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id;

      // Step 3: Add tracks to the playlist
      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uris: trackUris }),
        }
      );
      if (!addTracksResponse.ok) {
        console.error("Failed to add tracks:", addTracksResponse.statusText);
        return;
      }

      console.log(`Playlist "${name}" created and tracks added!`);
    } catch (error) {
      console.error("Error saving playlist:", error);
    }
  },
};

export default Spotify;
