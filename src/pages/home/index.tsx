import styles from './home.module.scss';

import LogoImage from '../../assets/img/logo.png'
import BackIcon from '../../assets/img/icons/back.svg'

import { PlayerControl } from '../../components/PlayerControl';
import { PlayList } from '../../components/PlayList';
import { usePlayer } from '../../services/PlayerContext';

function Home(){

    const { mode, setMode, setEpisodeList } = usePlayer();

    return(
        <div className={styles.container}>
            <header>
                <img src={LogoImage} />
            </header>
            <section>
                <PlayList />
                {
                    mode === "episodes" ? 
                    <div 
                        className={styles.fab}
                        onClick={ e => {
                            setEpisodeList([])
                            setMode("playlist")
                        }}
                    >
                        <img src={BackIcon}/>
                    </div>
                    :
                    null
                }
            </section>
            <PlayerControl />
        </div>
    )
}

export { Home }