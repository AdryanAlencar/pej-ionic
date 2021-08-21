import { createContext, ReactNode, useContext, useState } from 'react';
import { VideoProps } from './YoutuberAPI.types';

type PlayerContextData = {
    episodeList: VideoProps[];
    playing: VideoProps;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    mode: string;
    setEpisodeList: (episodes: VideoProps[]) => void;
    setPlaying: (episode: VideoProps) => void;
    setMode: (mode: "playlist" | "episodes") => void;
    play: () => void;
    playList: (list : VideoProps[], index: number) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    setPlayingState: (state: boolean) => void;
    clearPlayerState: () => void;    
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children : ReactNode
}

export function PlayerContextProvider({ children } : PlayerContextProviderProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [ mode , setMode ] = useState("playlist");
    const [isShuffling, setIsShuffling] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [episodeList, setEpisodeList] = useState([] as VideoProps[]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [ playing, setPlaying ] = useState({} as VideoProps);

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

    function play() {
        setIsPlaying(true);
    }

    function playList(list: VideoProps[], index : number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function playNext(){
        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        }else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious(){
        if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    function clearPlayerState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    return (
        <PlayerContext.Provider 
            value={
                { 
                    playing,
                    setPlaying,
                    episodeList, 
                    setEpisodeList,
                    currentEpisodeIndex, 
                    playList,
                    isPlaying, 
                    playPrevious,
                    playNext,
                    play, 
                    togglePlay, 
                    setPlayingState,
                    hasNext,
                    hasPrevious,
                    clearPlayerState,
                    mode,
                    setMode
                }
            }
        >
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}