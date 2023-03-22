import React from 'react';
import classes from './ViewResult.module.css';


const ViewResult = (props) => {
    return (
        <div className={classes.backdrop}>
            <div className={classes.modal}>
                <header className={classes.header}>
                    <img src={require("../../images/result.png")} />
                </header>
                <div className={classes.student_details}>
                    <div className={classes.fields}>
                        <div>
                            <span className={classes.field_name}>Name:</span>
                            <span className={classes.field_description}> {props.studentData.name}</span>
                        </div>
                        <div>
                            <span className={classes.field_name}>Course:</span>
                            <span className={classes.field_description}> {props.studentData.course}</span>
                        </div>
                    </div>
                    <div className={classes.fields}>
                        <div>
                            <span className={classes.field_name}>Admission No.:</span>
                            <span className={classes.field_description}> {props.studentData.admNo}</span>
                        </div>
                        <div>
                            <span className={classes.field_name}>Department:</span>
                            <span className={classes.field_description}> {props.studentData.department}</span>
                        </div>
                    </div>
                    <div className={classes.fields}>
                        <div>
                            <span className={classes.field_name}>Semester No.:</span>
                            <span className={classes.field_description}> {props.studentData.semNo}</span>
                        </div>
                        <div>
                            <span className={classes.field_name}>Session:</span>
                            <span className={classes.field_description}> {props.studentData.semSession}</span>
                        </div>
                    </div>
                </div>
                
                <div className={classes.marks_form}>
                    <div className={classes.empty} />
                    {<table className={classes.table}>
                        <thead></thead>
                        <tbody>
                        <tr className={classes.row}>
                            <th className={classes.column_header}>Sr. No.</th>
                            <th className={classes.column_header}>Course Code</th>
                            <th className={classes.column_header}>Subject Name</th>
                            <th className={classes.column_header}>Marks</th>
                        </tr>
                        {props.studentData.subjects.map((sub, i)=>{
                            return (
                                <tr className={classes.row} key={i}>
                                    <td className={classes.data}>{i+1}</td>
                                    <td className={classes.data}>{sub.code}</td>
                                    <td className={classes.data}>{sub.subName}</td>
                                    <td className={classes.data}>{sub.marks}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>}
                    <div className={classes.empty} />
                </div>
                <footer className={classes.footer}>
                    {(props.buttonName || props.showDeny) && <div className={classes.footer_deny}><button onClick={props.denyHandler}>Cancel</button></div>}
                    {props.buttonName && <div className={classes.footer_approve}><button onClick={props.approveHandler}>{props.buttonName}</button></div>}
                </footer>
            </div>
        </div>
    )
}

export default ViewResult;