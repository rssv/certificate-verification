import React from "react";
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
    return (
        <header className={classes.main_header}>
            <div className={classes.side_header}>
                <div className={classes.empty_side} />
                <img src={require("../../images/iitismlogo.png")} />
                <div className={classes.empty_side} />
                <h1>IIT<br/>(ISM)</h1>
                <div className={classes.empty_side} />
            </div>
            <div className={classes.loginAction_header}>
                <div className={classes.login_header}>
                    <div className={classes.empty}>MARKSHEET VERIFICATION SYSTEM</div>
                    {props.user && <div className={classes.userImg}>
                        <img src={require('../../images/user.png')} />
                    </div>} 
                    {props.user && <h2>{props.user.name}</h2>}
                    {props.user && <button className={classes.logout_button} type="button"onClick={props.logoutHandler}>Logout</button>}
                </div>
                <div className={classes.action_header}>
                    <h2>{props.actionTitle}</h2>
                </div>
            </div>
        </header>
    )
}

export default MainHeader;