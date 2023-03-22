import React from "react";
import classes from './SidePane.module.css';
import Button from './Button';

const SidePaneDean = (props) => {
    const signResultClickHandler = () => {
        props.onChange('Sign Result', 'Sign Result')
    }

    const viewSignedResultClickHandler = () => {
        props.onChange('View Signed Result', 'View Signed Result')
    }

    const signFinalResultClickHandler = () => {
        props.onChange('Sign Final Result','Sign Final Result')
    }

    const signedFinalResultClickHandler = () => {
        props.onChange('Signed Final Result', 'Signed Final Result')
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