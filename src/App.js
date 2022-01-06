//Adding Components
import { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Header from "./components/Header";
//Import styles
import './styles/app.scss';
//Import data.js, the former variable data is variable that you gonna invoke after
import data from './data'; // useState(data()), after importing then you can use this in state

function App() {
  //Ref
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data()); 
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0, 
    duration: 0,
    animationPercentage: 0,
});
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [isDarkModeActive, setIsDarkModeActive] = useState(true);
  
  //Handler -> event
  const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration || 0;
  //Calculate Percentage
  const roundedCurrent = Math.round(current);  
  const roundedDuration = Math.round(duration);
  const animation = Math.round((roundedCurrent / roundedDuration)*100);
  setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation})
};
//Fix loaded songs issue
  const autoPlayHandler = () => {
  if(isPlaying){
      audioRef.current.play();
  }
};

//Auto Next song when song is ended
  const songEndHandler =  async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1+songs.length)%songs.length]);
    if(isPlaying) {
      audioRef.current.play();
  }
}

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""} ${isDarkModeActive? "dark-background": ""}`}>
      <Header 
        libraryStatus={libraryStatus} 
        setLibraryStatus={setLibraryStatus}
        isDarkModeActive={isDarkModeActive}
        setIsDarkModeActive={setIsDarkModeActive}
      />
      <Song 
        currentSong={currentSong} 
        isPlaying={isPlaying}
        isDarkModeActive={isDarkModeActive}
      />
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs = {songs}
        setCurrentSong={setCurrentSong}
        isDarkModeActive={isDarkModeActive}
      />
      <Library 
        audioRef={audioRef} 
        songs={songs} 
        setCurrentSong={setCurrentSong} 
        isPlaying={isPlaying}
        currentSong = {currentSong}
        libraryStatus = {libraryStatus}
        isDarkModeActive={isDarkModeActive}
      />
      <audio 
        onLoadedData={autoPlayHandler}
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
