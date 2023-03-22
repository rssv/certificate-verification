import React from "react";
import classes from './SidePane.module.css';
import Button from './Button';

const SidePaneInstructor = (props) => {
    const marksUploadClickHandler = () => {
        props.onChange('Marks Upload', 'Marks Upload')
    }

    const viewMarksClickHandler = () => {
        props.onChange('View Marks', 'View Marks')
    }

    const dummyButton2ClickHandler = () => {
        props.onChange('Dummy Action 2', 'Dummy Action 2',)
    }

    const dummyButton3ClickHandler = () => {
        props.onChange('Dummy Action 3', 'Dummy Action 3',)
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