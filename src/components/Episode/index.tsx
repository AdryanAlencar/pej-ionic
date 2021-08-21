import React from "react";
import { VideoProps } from "../../services/YoutuberAPI.types";

import styles from './episode.module.scss';
import PlayIcon from '../../assets/img/icons/play.svg';
import Loading from '../../assets/img/loading.png';
import { getMp3 } from "../../services/YoutuberAPI";
import { PlayerContext } from "../../services/PlayerContext";

type EpisodeState = {
    postedAt: Date,
    loading: boolean
}

class Episode extends React.Component<VideoProps, EpisodeState>{

    static contextType = PlayerContext;

    constructor(props: VideoProps){
        super(props);
        this.state = {
            postedAt: new Date(this.props.snippet.publishedAt),
            loading: false
        }
    }    

    play(videoId: string){
        this.setState({
            loading: true
        })
        getMp3(videoId).then(e => {
            this.setState({
                loading: false
            })
            
            if(e.status === "success"){
                this.context.setPlaying(this.props);
                this.context.play();
            }else{
                alert(e.message);
            }
        });
    }

    render(){
        const day = this.state.postedAt.getDate();
        const month = this.state.postedAt.getMonth();
        const year = this.state.postedAt.getFullYear();

        return(
            <div className={styles.Episode}>
                <img src={this.props.snippet.thumbnails.medium.url}/>
                <div className={styles.details}>
                    <h3>
                        {this.props.snippet.title}
                    </h3>
                    <div className={styles.more}>
                        <span>
                            {`${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year < 10 ? `0${year}` : year}`}
                        </span>
                        <button onClick={() => this.play(this.props.contentDetails.videoId)}>
                            <label>Reproduzir</label>
                            <img src={PlayIcon}/>
                        </button>                    
                    </div>                 
                </div>
                <div className={`${styles.loading} ${this.state.loading ? "": styles.hide}`}>
                    <img src={Loading} /> 
                </div>                
            </div>
        )

    }

}

export { Episode }