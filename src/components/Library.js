import LibrarySong from "./LibrarySong"

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, currentSong, libraryStatus, isDarkModeActive }) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''} ${isDarkModeActive? "dark-library" :"" }`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong 
                        songs={songs} 
                        setCurrentSong={setCurrentSong} 
                        song={song}
                        // id={song.id}
                        key={song.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        currentSong={currentSong}
                        isDarkModeActive={isDarkModeActive}
                />
                ))}
            </div>
        </div>
    );
};

export default Library