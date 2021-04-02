import React from 'react';

import Wrapper from '../../../hoc/Wrapper/Wrapper';
import PlaylistRow from '../Playlist/PlaylistRow/PlaylistRow';

import styles from './Playlist.css';

const Playlist = (props) => {
    const pages = {
        loadingScreen: <Wrapper>
                        <div id="abyss-loading-indicator" className={styles.playlistContainer}>
                            <div id="abyss-playlist-empty-state" className={styles.playlistEmptyState}>
                                <span className={styles.abyssJumpingIndicator1}>🎵</span>
                                <span className={styles.abyssJumpingIndicator2}>🎵</span>
                                <span className={styles.abyssJumpingIndicator3}>🎵</span>
                            </div>
                        </div>
                    </Wrapper>,
        playlist: <Wrapper>
                    <div id="abyss-playlist-main-container" className={styles.playlistContainer}>
                        {props.tracklist && props.tracklist.map((track, index) => (
                            <PlaylistRow
                                key={`abyss-track-${index}`}
                                trackId={track.trackId}
                                albumImage={track.albumImage}
                                songTitle={track.songTitle}
                                artist={track.artist}
                                album={track.album}
                                externalURL={track.externalURL}
                            />
                        ))}
                    </div>
                </Wrapper>,
        emptyState: <Wrapper>
                        <div id="abyss-playlist-main-empty-state" className={styles.playlistContainer}>
                            <div id="abyss-playlist-empty-state" className={styles.playlistEmptyState}>
                                Your playlist will be shown here.<br />Start by uploading an image.
                            </div>
                        </div>
                    </Wrapper>
    }

    return (props.loading ? pages.loadingScreen : props.tracklist ? pages.playlist : pages.emptyState);
}

export default Playlist;