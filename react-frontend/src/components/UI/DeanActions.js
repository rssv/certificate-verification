import React, {useContext} from 'react';
import AuthContext from '../../context/auth-context';
import SignApprovedResults from '../contents/SignApprovedResults';
import SignedResults from '../contents/SignedResults';
import SignFinalResults from '../contents/SignFinalResults';
import SignedFinalResults from '../contents/SignedFinalResults';

const DeanActions = () => {
    const ctx = useContext(AuthContext);
    return (
        <React.Fragment>
            {ctx.action === "Sign Result" && <SignApprovedResults />}
            {ctx.action === "View Signed Result" && <SignedResults />}
            {ctx.action === "Sign Final Result" && <SignFinalResults />}
            {ctx.action === "Signed Final Result" && <SignedFinalResults />}
        </React.Fragment>
    )
}

export default DeanActions;