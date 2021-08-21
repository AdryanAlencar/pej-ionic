import React from "react";
import { PlayListResponseProps } from "../../services/YoutuberAPI.types";
import { PlayerContext } from "../../services/PlayerContext";

import styles from './playlistitem.module.scss'

import ListIcon from '../../assets/img/icons/list.svg'
import { getVideos } from "../../services/YoutuberAPI";

class PlayListItem extends React.Component<PlayListResponseProps>{
    static  contextType = PlayerContext;
    
    constructor(props: PlayListResponseProps){
        super(props);
    }

    render(){
        return(
            <div 
                className={styles.Episode}                 
            >
                <img src={this.props.snippet.thumbnails.medium.url}/>
                <div className={styles.details}>
                    <h3>
                        {this.props.snippet.title}
                    </h3>
                    <p>{this.props.snippet.channelTitle}</p>
                </div>
                <div 
                    className={styles.more}
                    onClick={ e => {
                        this.context.setMode("episodes");
                        getVideos(this.props.id).then(response => {
                            this.context.setEpisodeList(response.items);
                        })
                        
                    }}    
                >
                    <img src={ListIcon}/>
                </div>
            </div>
        )
    }

}

export { PlayListItem }