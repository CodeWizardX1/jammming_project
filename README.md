# Jammming 🎵

A React web application that allows users to search the Spotify library, create custom playlists, and save them directly to their Spotify account.

## 🎯 Purpose

Jammming is a music playlist creation tool that integrates with the Spotify Web API. Users can search for their favorite songs, artists, and albums, then create personalized playlists and save them directly to their Spotify account. This project demonstrates modern React development practices and API integration.

## 🛠️ Technologies Used

- **React 19.1.0** - Frontend framework for building the user interface
- **JavaScript (ES6+)** - Core programming language
- **CSS Modules** - Scoped styling for components
- **Spotify Web API** - Music data and playlist management
- **OAuth 2.0 with PKCE** - Secure authentication flow
- **HTML5** - Markup structure
- **Create React App** - Build tooling and development environment

### Dependencies
- `pkce-challenge` - For generating PKCE codes for secure OAuth
- `react-scripts` - Build and development scripts
- `@testing-library/*` - Testing utilities
- `web-vitals` - Performance monitoring

## ✨ Features

### 🔍 Search Functionality
- Search for tracks by song title, artist name, or album
- Real-time search results from Spotify's extensive music library
- Clean, organized display of search results

### 📝 Playlist Management
- Create custom playlists with personalized names
- Add tracks from search results to playlist
- Remove tracks from playlist
- Visual feedback for playlist modifications

### 💾 Spotify Integration
- Secure OAuth 2.0 authentication with PKCE flow
- Save playlists directly to user's Spotify account
- Automatic playlist creation with custom names and descriptions

### 📱 Responsive Design
- Mobile-first design approach
- Responsive breakpoints for optimal viewing on all devices
- Touch-friendly interface for mobile users
- Breakpoint at 962px for tablet/mobile optimization

### 🎨 User Interface
- Modern, clean design with dark theme
- Intuitive user experience
- Visual separation between search results and playlist
- Hover effects and smooth transitions

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header/          # App header with branding
│   ├── SearchBar/       # Search input and functionality
│   ├── SearchResults/   # Display search results
│   ├── Playlist/        # Playlist creation and management
│   ├── Track/          # Individual track component
│   └── Tracklist/      # List of tracks container
├── utils/
│   └── Spotify.js      # Spotify API integration
├── data/
│   └── mockTracks.js   # Sample data for development
├── assets/             # Static assets
├── App.js             # Main application component
├── App.css            # Global styles
└── index.js           # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Spotify Developer Account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd jammming
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory and add:
```
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000
```

4. Start the development server
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Spotify App Setup
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add `http://localhost:3000` as a redirect URI
4. Copy your Client ID to the `.env` file

## 📱 Usage

1. **Login**: Authenticate with your Spotify account
2. **Search**: Use the search bar to find songs, artists, or albums
3. **Add Tracks**: Click the "+" button to add tracks to your playlist
4. **Name Playlist**: Give your playlist a custom name
5. **Remove Tracks**: Click the "-" button to remove tracks from your playlist
6. **Save**: Click "SAVE TO SPOTIFY" to save your playlist to your Spotify account

## 🎮 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🔐 Security

- Implements OAuth 2.0 with PKCE (Proof Key for Code Exchange) for secure authentication
- No client secrets stored in frontend code
- Secure token management with session storage
- Automatic token refresh handling

## 🌟 Future Enhancements

- Playlist editing capabilities
- Track preview functionality
- Social sharing features
- Advanced search filters
- Playlist collaboration
- Music recommendations

## 📄 License

This project was created as part of a Codecademy course and is for educational purposes.

---

*Built with ❤️ using React and the Spotify Web API*