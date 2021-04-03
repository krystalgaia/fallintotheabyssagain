import React from 'react';

import Wrapper from '../../../hoc/Wrapper/Wrapper';
import PlaylistRow from '../Playlist/PlaylistRow/PlaylistRow';
import PlaylistRowSkeleton from '../Playlist/PlaylistRowSkeleton/PlaylistRowSkeleton';

import styles from './Playlist.css';

const Playlist = (props) => {
    const pages = {
        loadingScreen: <Wrapper>
                        <div id="abyss-loading-indicator" className={styles.playlistContainer}>
                                <PlaylistRowSkeleton key="1" />
                                <PlaylistRowSkeleton key="2" />
                                <PlaylistRowSkeleton key="3" />
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
        initialEmptyState: <Wrapper>
                        <div id="abyss-playlist-main-empty-state" className={styles.playlistContainer}>
                            <div id="abyss-playlist-empty-state" className={styles.playlistEmptyState}>
                                Your playlist will be shown here.<br />Start by uploading an image.
                            </div>
                        </div>
                    </Wrapper>,
        emptyState: <Wrapper>
                        <div id="abyss-playlist-main-empty-state" className={styles.playlistContainer}>
                            <div id="abyss-playlist-empty-state" className={styles.playlistEmptyState}>
                                Sorry, we cannot create a playlist for you right now 😖 
                            </div>
                        </div>
                    </Wrapper>
    }

    return (props.loading ? pages.loadingScreen : props.noData ? pages.emptyState : props.tracklist ? pages.playlist : pages.initialEmptyState);
}

export default Playlist;