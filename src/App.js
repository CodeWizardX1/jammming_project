import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Header from "./components/Header/Header";
import Playlist from "./components/Playlist/Playlist";
import SearchResults from "./components/SearchResults/SearchResults";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <div className="bodyContent">
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
