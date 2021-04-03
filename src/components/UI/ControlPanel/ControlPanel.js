import React from 'react';

import Wrapper from '../../../hoc/Wrapper/Wrapper';
import ImageForm from '../ControlPanel/ImageForm/ImageForm';
import Button from '../Button/Button';

import rgb2hsv from '../../../helpers/rgb2hsv.js';
import { COLOR_BOUNDS, COLORS } from '../../../helpers/colorTable.js';

import ColorThief from '../../../../node_modules/color-thief/js/color-thief.js';

import styles from '../ControlPanel/ControlPanel.css';

const ControlPanel = (props) => {
    let filename = "No image selected";

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

    const savePlaylist = () => {
        alert("Save this playlist");
    }

    return(
        <Wrapper>
            <div id="abyss-main-panel" className={styles.controlPanelContainer}>
                <div className={styles.controlPanelHeader}>
                    <span id="abyss-control-panel-emoji" role="img" aria-label="crescent-moon" className={styles.controlPanelHeaderEmoji}>🌙</span>
                </div>
                <div className={styles.controlPanelControls}>
                    <div className={styles.controlPanelControlItem}>
                        <ImageForm textDisplay={filename}/>
                    </div>
                    <div className={styles.controlPanelSubmitButton}>
                        {!props.noData &&
                            <Button loading={props.loading} onClicked={createPlaylist}>Create Playlist</Button>
                        }
                        {props.showSaveButton &&
                            <Button buttonType="btnPrimary" onClicked={savePlaylist}>Save Playlist</Button>
                        }
                        {props.noData &&
                            <Button buttonType="btnDisabled" noData={props.noData}>No songs found 😥</Button>
                        }
                    </div>
                </div>
                <div className={styles.abyssCredits}>
                    Designed & Built by Kiersten Ramos<br />
                    Powered by React.js, Spotify, & Color Thief
                </div>
            </div>
        </Wrapper>
    );
}

export default ControlPanel;