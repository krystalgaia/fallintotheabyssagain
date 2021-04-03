import React from 'react';

import Wrapper from '../../../../hoc/Wrapper/Wrapper';

import styles from '../ImageForm/ImageForm.css';

const ImageForm = (props) => {
    const onUploadButtonClicked = () => {
        let fileUpload = document.getElementById("abyss-image-upload");
        fileUpload.click();
    }

    const onFileSelected = (e) => {
        let reader = new FileReader();
        reader.onload = function(e) {
            let emojiEmptyState = document.getElementById("abyss-saturn-emoji");
            let output = document.getElementById("abyss-preview-image");

            emojiEmptyState.style.display = "none";
            output.src = e.target.result;
            output.style.display = "block";
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    return(
        <Wrapper>
            <div className={styles.imageFormContainer}>
                <div className={styles.imageFormFileUpload}>
                    <label className={styles.imageFormUploadButton} onClick={onUploadButtonClicked}>Choose An Image</label>
                    <input type="file" id="abyss-image-upload" accept=".jpg, .jpeg" name="abyss-image-upload" onChange={onFileSelected} />
                </div>
                <div className={styles.imageFormImgPreview}>
                    <span id="abyss-saturn-emoji" role="img" aria-label="saturn" className={styles.abyssSaturnEmoji}>🌄</span>
                    <img id="abyss-preview-image" alt="Preview of chosen file"></img>
                </div>
            </div>
        </Wrapper>
    );
}

export default ImageForm;