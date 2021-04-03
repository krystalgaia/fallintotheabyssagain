import React from 'react';

import Wrapper from '../../../hoc/Wrapper/Wrapper';
import MainPage from '../MainPage/MainPage';
import Button from '../../UI/Button/Button';

import styles from '../LandingPage/LandingPage.css';

const LandingPage = (props) => {
    const pages = {
        main: <MainPage
                noData={props.noData}
                loading={props.loading}
                tracklist={props.tracklist}
                onCreatePlaylist={props.onCreatePlaylist}
                onSavePlaylist={props.onSavePlaylist}
                cannotCreatePlaylist={props.cannotCreatePlaylist}
                loadingPlaylistSave={props.loadingPlaylistSave}
                playlistLink={props.playlistLink} />,
        login: <Wrapper>
                <div className={styles.landingPageContainer}>
                    <div className={styles.landingPageEmoji}><span role="img" aria-label="crescent-moon">🌙</span></div>
                    <div className={styles.landingPageSubContainer}>
                        <div className={styles.landingPageHeader}>Abyss</div>
                        <div className={styles.landingPageItem}>discover songs from your favorite genres<br/>using colors from images</div>
                        <div className={styles.landingPageItem}>
                            <Button buttonType="btnPrimary" onClicked={props.onLogin}>
                                <svg id="spotify-icon" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m12 24c6.624 0 12-5.376 12-12s-5.376-12-12-12-12 5.376-12 12 5.376 12 12 12zm4.872-6.344v.001c-.807 0-3.356-2.828-10.52-1.36-.189.049-.436.126-.576.126-.915 0-1.09-1.369-.106-1.578 3.963-.875 8.013-.798 11.467 1.268.824.526.474 1.543-.265 1.543zm1.303-3.173c-.113-.03-.08.069-.597-.203-3.025-1.79-7.533-2.512-11.545-1.423-.232.063-.358.126-.576.126-1.071 0-1.355-1.611-.188-1.94 4.716-1.325 9.775-.552 13.297 1.543.392.232.547.533.547.953-.005.522-.411.944-.938.944zm-13.627-7.485c4.523-1.324 11.368-.906 15.624 1.578 1.091.629.662 2.22-.498 2.22l-.001-.001c-.252 0-.407-.063-.625-.189-3.443-2.056-9.604-2.549-13.59-1.436-.175.048-.393.125-.625.125-.639 0-1.127-.499-1.127-1.142 0-.657.407-1.029.842-1.155z"/>
                                </svg>
                                Login with Spotify
                            </Button>
                        </div>
                    </div>
                </div>
            </Wrapper>
    };

    return(props.hasToken ? pages.main : pages.login);
}

export default LandingPage;