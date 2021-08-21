import Slider from "rc-slider/lib/Slider";
import React from "react";

import styles from './playercontrol.module.scss';
import 'rc-slider/assets/index.css';

import PlayButton from '../../assets/img/icons/play.svg'
import PauseButton from '../../assets/img/icons/pause.svg'
import FowardButton from '../../assets/img/icons/foward.svg'
import BackwardButton from '../../assets/img/icons/backward.svg'
import { PlayerContext, usePlayer } from "../../services/PlayerContext";
import { useRef } from "react";
import { createRef } from "react";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { useState } from "react";

type PlayerControlProps = {

}

export const PlayerControl = (props: PlayerControlProps) => {

    const [timing, setTiming] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const {
        playing,
        isPlaying, 
        togglePlay,
        setPlayingState
    } = usePlayer();
    


    function setupProgressListener(){
        const audio = audioRef.current || document.createElement("audio");
        audio.currentTime = 0;
        
        audioRef.current?.addEventListener('timeupdate', () => {
            setTiming(Math.floor(audioRef.current?.currentTime || 0));
        })
    }

    function handleSeek(timing : number){
        const audio = audioRef.current || document.createElement("audio");
        audio.currentTime = timing;
        setTiming(timing);
    }

    return(
        <footer className={styles.PlayerControl}>
            <div className={styles.progressBar}>
                <span>
                {convertDurationToTimeString(timing)}
                </span>
                <div className={styles.slider}>
                    <Slider
                        max={audioRef.current?.duration || 0}
                        value={timing}
                        onChange={handleSeek}
                        trackStyle={{ backgroundColor: '#EB3337' }}
                        railStyle={{ backgroundColor: '#FFFFFF' }}
                        handleStyle={{ borderColor: '#595959', borderWidth: 4 }}
                    />
                </div>
                <span>
                    {convertDurationToTimeString(Math.floor(audioRef.current?.duration || 0))}
                </span>                    
            </div>
            <div className={styles.controls}>
                <button className={styles.icon}>
                    <img src={BackwardButton}/>
                </button>
                <button 
                    className={styles.icon}
                    onClick={e => {
                            if(isPlaying){
                                audioRef.current?.pause();
                            }else{
                                audioRef.current?.play();
                            }
                            togglePlay();
                        }
                    }    
                >
                    <img src={isPlaying ? PauseButton : PlayButton}/>
                </button>
                <button className={styles.icon}>
                    <img src={FowardButton}/>
                </button>
            </div>
            {
                playing && (
                    <audio 
                        src={`http://db1.amemais.tech/video/${playing?.contentDetails?.videoId}.mp3`}
                        ref={audioRef}
                        autoPlay={true}    
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedMetadata={ () => setupProgressListener() }
                    />
                )
            }
            
        </footer>
    )
}