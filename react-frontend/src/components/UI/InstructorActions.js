import React, {useContext} from 'react';
import AuthContext from '../../context/auth-context';
import StudentList from '../contents/studentList';
import ViewMarks from '../contents/ViewMarks';

const InstructorActions = () => {
    const ctx = useContext(AuthContext);
    return (
        <React.Fragment>
            {ctx.action === "Marks Upload" && <StudentList />}
            {ctx.action === "View Marks" && <ViewMarks />}
        </React.Fragment>
    )
}

export default InstructorActions;