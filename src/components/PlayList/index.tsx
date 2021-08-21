import React from "react";
import { PlayerContext } from "../../services/PlayerContext";
import { getPlayLists, getVideos } from "../../services/YoutuberAPI";
import { PlayListItemsProps, PlayListResponseProps, PlaylistsResponse, VideoProps } from "../../services/YoutuberAPI.types";
import { Episode } from "../Episode";
import { PlayListItem } from "../PlayListItem";

type PlayListProps = {

}

type PlayListState = {
    playlist: PlaylistsResponse,
    episodes: PlayListItemsProps,
    mode: "playlist" | "episodes",
    playlistId: string
}

class PlayList extends React.Component<PlayListProps, PlayListState>{

    static contextType = PlayerContext;

    constructor(props: PlayListProps){
        super(props);

        this.state = {
            playlist: {} as PlaylistsResponse,
            episodes: {} as PlayListItemsProps,
            mode: "playlist",
            playlistId: ""
        }

    }

    componentDidMount(){
        if(this.state.mode === "playlist"){
            getPlayLists().then(playlist => {
                this.setState({
                    playlist
                })
            })
        }else {
            getVideos(this.state.playlistId).then(episodes => {
                this.setState({
                    episodes
                })
            });
        }
        
    }

    changePlayList(playlistId : string){
        this.setState({
            playlistId
        })

        getVideos(playlistId).then(episodes => {
            this.setState({
                episodes,
                mode: "episodes"
            })
        });
    }

    render(){
        return(
            <>
                {
                    this.context.mode === "playlist" ? 
                        this.state.playlist.items?.map((item : PlayListResponseProps) => {
                            return(
                                <PlayListItem 
                                    {...item}
                                />
                            )
                        }) :

                        this.context.episodeList?.map((item : VideoProps) => {
                            return(
                                <Episode 
                                    {...item}
                                />
                            )
                        })
                }
            </>
        )
    }

}

export { PlayList }