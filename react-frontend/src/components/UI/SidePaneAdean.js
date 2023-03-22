import React from "react";
import classes from './SidePane.module.css';
import Button from './Button';

const SidePaneAdean = (props) => {
    const approveResultClickHandler = () => {
        props.onChange('Approve Result', 'Approve Result')
    }

    const approvedResultClickHandler = () => {
        props.onChange('View Approved Result', 'View Approved Result')
    }

    const approveFinalResultClickHandler = () => {
        props.onChange('Generate Final Results','Generate Final Results')
    }

    const approvedFinalResultClickHandler = () => {
        props.onChange('View Final Results', 'View Final Results')
    }

    const faiedFinalResultClickHandler = () => {
        props.onChange('View Failed Results', 'View Failed Results')
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