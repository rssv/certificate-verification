import React, {useContext} from 'react';
import AuthContext from '../../context/auth-context';
import PendingResult from '../contents/PendingResult';
import ApprovedResults from '../contents/AprrovedResults';
import FinalResults from '../contents/FinalResults';
import ApprovedFinalResults from '../contents/ApprovedFinalResults';
import FailedFinalResults from '../contents/FailedFinalResults';

const AdeanActions = () => {
    const ctx = useContext(AuthContext);
    return (
        <React.Fragment>
            {ctx.action === "Approve Result" && <PendingResult /> }
            {ctx.action === "View Approved Result" && <ApprovedResults /> }
            {ctx.action === "Generate Final Results" && <FinalResults />}
            {ctx.action === "View Final Results" && <ApprovedFinalResults />}
            {ctx.action === "View Failed Results" && <FailedFinalResults />}
        </React.Fragment>
    )
}

export default AdeanActions;