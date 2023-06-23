import React, { useContext } from "react";
import classes from './SidePane.module.css';
import Button from './Button';
import AuthActionContext from "../context/authAction";

const SidePaneAdean = () => {
    const ctx = useContext(AuthActionContext);
    const approveResultClickHandler = () => {
        ctx.onActionChange('Approve Result');
    }

    const approvedResultClickHandler = () => {
        ctx.onActionChange('View Approved Result');
    }

    const approveFinalResultClickHandler = () => {
        ctx.onActionChange('Generate Final Results');
    }

    const approvedFinalResultClickHandler = () => {
        ctx.onActionChange('View Final Results');
    }

    const faiedFinalResultClickHandler = () => {
        ctx.onActionChange('View Failed Results');
    }

    return (
        <div className={classes.navigation}>
            <div className={classes.navigation_button}>
                <Button onClick={approveResultClickHandler}>Approve Result</Button><br />
                <Button onClick={approvedResultClickHandler}>View Approved Result</Button><br />
                <Button onClick={approveFinalResultClickHandler}>Generate Final Results</Button><br />
                <Button onClick={approvedFinalResultClickHandler}>View Final Results</Button>
                <Button onClick={faiedFinalResultClickHandler}>View Failed Results</Button>
            </div>
        </div>
    )
}

export default SidePaneAdean;