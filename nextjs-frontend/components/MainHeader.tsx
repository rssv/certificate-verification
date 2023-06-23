import { FC, useContext } from "react"
import classes from '../styles/MainHeader.module.css'
import AuthActionContext from "../context/authAction"
import Image from "next/image"

const MainHeader = (): JSX.Element => {
    const ctx = useContext(AuthActionContext);
    return (
        <div className={classes.main_header}>
            <div className={classes.side_header}>
                <h1>ABC UNIVERSITY</h1>
            </div>
            <div className={classes.loginAction_header}>
                <div className={classes.login_header}>
                    <div className={classes.login_header}>
                    <div className={classes.login_header__heading}><h2>MARKSHEET VERIFICATION SYSTEM</h2></div>
                    {ctx.isLoggedIn && <div className={classes.userImg}>
                        <div><Image 
                            src={'/user.png'} 
                            height={25}
                            width={20}
                        /></div>
                        <h2>{ctx.user.name}</h2>
                    </div>} 

                    {ctx.isLoggedIn && <button className={classes.logout_button} type="button" >Logout</button>}
                </div>
                </div>
                <div className={classes.action_header}>
                    <h3>{ctx.action}</h3>
                </div>
            </div>
        </div>
    );
}

export default MainHeader;