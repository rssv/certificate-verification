import React from 'react';
import classes from '../styles/Button.module.css';
import { FC } from 'react';

type Props = {
    children?: React.ReactNode,
    onClick: () => void
};

const Button:FC<Props> = (props) => {
    return (
        <button className={classes.button} type='button' onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;