import React, {useContext, useEffect} from 'react';
import AuthForm from './AuthForm';
import AuthActionContext from '../context/authAction';
import Verify from './Verify';
import Button from './Button';

type AuthData = {
    username: string,
    password: string
}

const PublicActions: React.FC<{
    onLogin: (data: AuthData) => void
}> = (props) => {
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

    useEffect(() => {
        ctx.changeSideButtons(
            <>
                <Button onClick={verifyCertificateClickHandler}>Verify Certificate</Button><br />
                <Button onClick={helpDeskClickHandler}>Help Desk</Button><br />
                <Button onClick={contactUsClickHandler}>Contact Us</Button><br />
                <Button onClick={employeeLoginClickHandler}>Employee Login</Button><br />
            </>
        )
    }, [])
    return (
        <React.Fragment>
            {ctx.action === "Employee Login" && <AuthForm onLogin={props.onLogin} />}
            {ctx.action === "Verify Certificate"  && <Verify />}
        </React.Fragment>
    )
}

export default PublicActions;