import React from 'react';

import Wrapper from '../../../../hoc/Wrapper/Wrapper';

import styles from './PlaylistRow.css';

const PlaylistRow = (props) => {
    return(
        <Wrapper>
            <div className={`abyss-playlist-row ${styles.playlistRowContainer}`}>
                <div
                    className={styles.playlistRowAlbumImage}
                    style={{
                        backgroundImage: 'url(' + props.albumImage + ')',
                        backgroundSize: '100px 100px',
                        backgroundPosition: 'center'
                    }}>
                </div>
                <div className={styles.playlistRowDetails}>
                    <div className={styles.playlistRowSongTitle}>
                        <a href={props.externalURL}>{props.songTitle}</a>
                    </div>
                    <div className={styles.playlistRowArtist}>{props.artist}</div>
                    <div className={styles.playlistRowAlbum}>{props.album}</div>
                </div>
            </div>
        </Wrapper>
    )
}

export default PlaylistRow;