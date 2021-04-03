import React from 'react';
import styles from './Button.css';

const button = (props) => (
    <button className={props.loading ? styles.btnDisabled : props.noData ? styles.btnNoData : styles.btnPrimary} onClick={props.onClicked} disabled={props.loading || props.noData}>
        {props.loading ? "Loading..." : props.children}
    </button>
);

export default button;