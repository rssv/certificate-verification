import React, { useContext } from "react";
import classes from './SidePane.module.css';
import Button from './Button';
import AuthActionContext from "../context/authAction";

const SidePaneDean = () => {
    const ctx = useContext(AuthActionContext);
    const signResultClickHandler = () => {
        ctx.onActionChange('Sign Result');
    }

    const viewSignedResultClickHandler = () => {
        ctx.onActionChange('View Signed Result');
    }

    const signFinalResultClickHandler = () => {
        ctx.onActionChange('Sign Final Result');
    }

    const signedFinalResultClickHandler = () => {
        ctx.onActionChange('Signed Final Result');
    }

    return (
        <div className={classes.navigation}>
            <div className={classes.navigation_button}>
                <Button onClick={signResultClickHandler}>Sign Result</Button><br />
                <Button onClick={viewSignedResultClickHandler}>View Signed Result</Button><br />
                <Button onClick={signFinalResultClickHandler}>Sign Final Result</Button><br />
                <Button onClick={signedFinalResultClickHandler}>Signed Final Result</Button>
            </div>
        </div>
    )
}

export default SidePaneDean;