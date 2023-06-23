import React, { ReactNode, useContext } from "react";
import classes from '../styles/SidePane.module.css';
import Button from './Button';
import AuthActionContext from "../context/authAction";

const SidePane = () => {
    const ctx = useContext(AuthActionContext);
    const verifyCertificateClickHandler = () => {
        ctx.onActionChange('Verify Certificate');
    }

    const helpDeskClickHandler = () => {
        ctx.onActionChange('Help Desk');
    }

    const contactUsClickHandler = () => {
        ctx.onActionChange('Contact Us');
    }

    const employeeLoginClickHandler = () => {
        ctx.onActionChange('Employee Login');
    }

    return (
        <div className={classes.navigation}>
            <div className={classes.navigation_button}>
                {
                   ctx.sideButtons
                }
            </div>
        </div>
    )
}

export default SidePane;