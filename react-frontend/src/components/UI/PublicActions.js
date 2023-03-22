import React, {useContext} from 'react';
import AuthForm from '../contents/AuthForm';
import AuthContext from '../../context/auth-context';
import Verify from '../contents/Verify';

const PublicActions = (props) => {
    const ctx = useContext(AuthContext);
    return (
        <React.Fragment>
            {ctx.action === "Employee Login" && <AuthForm onLogin={props.onLogin} />}
            {ctx.action === "Verify Certificate"  && <Verify />}
        </React.Fragment>
    )
}

export default PublicActions;