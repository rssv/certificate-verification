import React from "react";
import classes from './SidePane.module.css';
import Button from './Button';

const SidePaneHome = (props) => {
    const verifyCertificateClickHandler = () => {
        props.onChange('Verify Certificate', 'Verify Certificate')
    }

    const helpDeskClickHandler = () => {
        props.onChange('Help Desk', 'Help Desk')
    }

    const contactUsClickHandler = () => {
        props.onChange('Contact Us', 'Contact Us',)
    }

    const employeeLoginClickHandler = () => {
        props.onChange('Employee Login', 'Employee Login',)
    }

    return (
        <div className={classes.navigation}>
            <div className={classes.navigation_button}>
                <Button onClick={verifyCertificateClickHandler}>Verify Certificate</Button><br />
                <Button onClick={helpDeskClickHandler}>Help Desk</Button><br />
                <Button onClick={contactUsClickHandler}>Contact Us</Button><br />
                <Button onClick={employeeLoginClickHandler}>Employee Login</Button><br />
            </div>
        </div>
    )
}

export default SidePaneHome;