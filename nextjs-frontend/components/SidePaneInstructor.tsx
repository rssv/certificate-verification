import React, { useContext } from "react";
import classes from './SidePane.module.css';
import Button from './Button';
import AuthActionContext from "../context/authAction";

const SidePaneInstructor = () => {
    const ctx = useContext(AuthActionContext);
    const marksUploadClickHandler = () => {
        ctx.onActionChange('Marks Upload');
    }

    const viewMarksClickHandler = () => {
        ctx.onActionChange('View Marks');
    }

    const dummyButton2ClickHandler = () => {
        ctx.onActionChange('Dummy Action 1');
    }

    const dummyButton3ClickHandler = () => {
        ctx.onActionChange('Dummy Action 2');
    }

    return (
        <div className={classes.navigation}>
            <div className={classes.navigation_button}>
                <Button onClick={marksUploadClickHandler}>Marks Upload</Button><br />
                <Button onClick={viewMarksClickHandler}>View Marks</Button><br />
                <Button onClick={dummyButton2ClickHandler}>Dummy Button 2</Button><br />
                <Button onClick={dummyButton3ClickHandler}>Dummy Button 3</Button>
            </div>
        </div>
    )
}

export default SidePaneInstructor;