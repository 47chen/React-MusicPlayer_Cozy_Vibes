const LibrarySong = ({ 
    song, 
    songs, 
    setCurrentSong, 
    audioRef, 
    isPlaying,
    currentSong,
    isDarkModeActive,
}) => {
    const songSelectHandler = async () => { 
        await setCurrentSong(song);
    };
    //Add Active State(selected song) in div
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.id === currentSong.id ? 'selected' : ""} ${isDarkModeActive ? "dark-song-description" : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className={`song-description`}>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;