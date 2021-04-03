import React from 'react';

import Wrapper from '../../../hoc/Wrapper/Wrapper';
import ImageForm from '../ControlPanel/ImageForm/ImageForm';
import Button from '../Button/Button';

import rgb2hsv from '../../../helpers/rgb2hsv.js';
import { COLOR_BOUNDS, COLORS } from '../../../helpers/colorTable.js';

import ColorThief from '../../../../node_modules/color-thief/js/color-thief.js';

import styles from '../ControlPanel/ControlPanel.css';
import buttonStyle from '../Button/Button.css';

const ControlPanel = (props) => {
    if (props.playlistLink && props.playlistLink !== "") {
        let hyperlink = document.createElement("a");
        let linkSrc = props.playlistLink;

        hyperlink.setAttribute("href", linkSrc);
        hyperlink.setAttribute("target", "_blank");
        hyperlink.click();

        let savePlaylist = document.getElementById("abyss-save-playlist");
        savePlaylist.setAttribute("disabled", true);
        savePlaylist.classList = buttonStyle.btnNoClick;
    }

    const createPlaylist = () => {
        let fileInput = document.getElementById("abyss-image-upload");
        let file = fileInput.files[0];

        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let moonEmoji = document.getElementById("abyss-control-panel-emoji");
                let output = document.createElement("img");
                let colorThief = new ColorThief();

                output.src = e.target.result;
                let rgb = colorThief.getColor(output);
                let hsv = rgb2hsv(rgb);
                let finalHue = COLOR_BOUNDS.filter(bound => {
                    return hsv.hue <= bound;
                });

                let colorKeyword = COLORS[finalHue[0]];
                moonEmoji.classList.remove("controlPanelHeaderEmoji");
                moonEmoji.style.textShadow = "0px 0px 45px rgb(" + rgb[0] + " " + rgb[1] + " " + rgb[2] + ")";

                props.onCreatePlaylist(colorKeyword);
            }
            reader.readAsDataURL(file);
        }
    }

    return(
        <Wrapper>
            <div id="abyss-main-panel" className={styles.controlPanelContainer}>
                <div className={styles.controlPanelHeader}>
                    <span id="abyss-control-panel-emoji" role="img" aria-label="crescent-moon" className={styles.controlPanelHeaderEmoji}>🌙</span>
                </div>
                <div className={styles.controlPanelControls}>
                    <div className={styles.controlPanelControlItem}><ImageForm/></div>
                    <div className={styles.controlPanelSubmitButton}>
                        {!props.noData && <Button btnId="abyss-create-playlist" loading={props.loading} onClicked={createPlaylist}>Create Playlist</Button>}
                        {props.showSaveButton && <Button btnId="abyss-save-playlist" loading={props.loadingPlaylistSave} onClicked={props.onSavePlaylist}>Save Playlist</Button>}
                        {props.noData && <Button btnId="abyss-no-songs-found" buttonType="btnDisabled" noData={props.noData}>No songs found 😥</Button>}
                        {props.cannotCreatePlaylist && <Button btnId="abyss-cannot-save-playlist" buttonType="btnDisabled" noData={props.cannotCreatePlaylist}>Cannot save playlist 😥</Button>}
                    </div>
                </div>
                <div className={styles.abyssCredits}>
                    Designed & Built by Kiersten Gyra Ramos<br />
                    Powered by React.js, Spotify, & Color Thief
                </div>
            </div>
        </Wrapper>
    );
}

export default ControlPanel;