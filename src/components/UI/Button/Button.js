import React from 'react';
import styles from './Button.css';

const button = (props) => (
    <button
        className={styles[props.buttonType]}
        onClick={props.onClicked}>
            {props.children}
    </button>
);

export default button;