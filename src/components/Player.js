import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Component
import { 
    faPlay,
    faForward, 
    faBackward,
    faPause,
} from "@fortawesome/free-solid-svg-icons"; // import specific svg Icon - Solid Style on fontAwesome web

const Player = ({ 
    audioRef,
    currentSong, 
    isPlaying, 
    setIsPlaying, 
    setSongInfo, 
    songInfo,
    songs,
    setCurrentSong,
  }) => {
    // How to access html audio? -> use Ref, need import
    // const audioRef = useRef(null);
    // Move to top App.js then can pass this state/props to one anohter
    
    // Event Handlers
    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
            // need to change the state to implement pause/play
            setIsPlaying(!isPlaying);
            console.log("pause");
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    // const timeUpdateHandler = (e) => {
    //     const current = e.target.currentTime;
    //     const duration = e.target.duration;
    //     setSongInfo({...songInfo, currentTime: current, duration})
    // };
    // below is already move to App.js

    const formatTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    };

    // Skip forward and backward
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward'){
            await setCurrentSong(songs[(currentIndex + 1+songs.length)%songs.length]);
        }
        if(direction === 'skip-back') {
            await setCurrentSong(songs[(currentIndex-1+songs.length)%songs.length]);
        }
    };

    //State -> is an object for time setting
    // const [songInfo, setSongInfo] = useState({
    //     currentTime: 0, 
    //     duration: 0,
    // });

    //Add the styles for input slide bar
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    };
    
    return(
        <div className="player">
            <div className="time-control">
                <p>{formatTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input 
                        min={0} 
                        max= {songInfo.duration} 
                        value={songInfo.currentTime} 
                        onChange={dragHandler}
                        type="range" />
                        <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{formatTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick = {()=> skipTrackHandler('skip-back')}
                    className="skip-back" 
                    size="2x" 
                    icon={faBackward} 
                />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    size="2x" 
                    icon={isPlaying ? faPause : faPlay} 
                />
                <FontAwesomeIcon
                    onClick = {() => skipTrackHandler('skip-forward')}
                    className="skip-forward" 
                    size="2x" 
                    icon={faForward} 
                />
            </div>
            
        </div>
    )
}

export default Player