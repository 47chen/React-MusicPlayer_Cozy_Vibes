import React from "react";

const Song = ({currentSong, isPlaying, isDarkModeActive}) => {
    return(
        <div className={`song-container ${isDarkModeActive? "dark-song-description-underImg" : ""}`}>
            <img 
                className={`${isPlaying ? "rotate" : ""}`}
                alt={currentSong.name} 
                src={currentSong.cover}
            ></img>
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    )
}

export default Song;
