import React from 'react';

import Wrapper from '../../../hoc/Wrapper/Wrapper';
import ControlPanel from '../../UI/ControlPanel/ControlPanel';
import Playlist from '../../UI/Playlist/Playlist';

import styles from '../MainPage/MainPage.css';

const MainPage = (props) => {
    return(
        <Wrapper>
            <div className={styles.mainPageContainer}>
                <ControlPanel loading={props.loading} noData={props.noData} showSaveButton={!props.loading && props.tracklist && !props.noData} onCreatePlaylist={props.onCreatePlaylist} />
                <Playlist noData={props.noData} loading={props.loading} tracklist={props.tracklist}/>
            </div>
        </Wrapper>
    )
}

export default MainPage;