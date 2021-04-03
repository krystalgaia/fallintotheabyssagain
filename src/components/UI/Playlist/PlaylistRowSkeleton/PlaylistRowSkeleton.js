import React from 'react';

import Wrapper from '../../../../hoc/Wrapper/Wrapper';

import styles from './PlaylistRowSkeleton.css';

const PlaylistRowSkeleton = (props) => {
    return(
        <Wrapper>
            <div className={`abyss-playlist-row-skeleton ${styles.playlistRowContainer}`}>
                <div className={styles.playlistRowAlbumImage}></div>
                <div className={styles.playlistRowDetails}>
                    <div className={styles.playlistRowSongTitle}></div>
                    <div className={styles.playlistRowArtist}></div>
                    <div className={styles.playlistRowAlbum}></div>
                </div>
            </div>
        </Wrapper>
    )
}

export default PlaylistRowSkeleton;