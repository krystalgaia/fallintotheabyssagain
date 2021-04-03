import React from 'react';
import styles from './Button.css';

const button = (props) => (
    <button
        id={props.btnId}
        className={props.loading ? styles.btnDisabled : props.noData ? styles.btnNoData : props.noClick ? styles.btnNoClick : styles.btnPrimary}
        onClick={props.onClicked}
        disabled={props.loading || props.noData || props.noClick}>
        {props.loading ? "Loading..." : props.children}
    </button>
);

export default button;