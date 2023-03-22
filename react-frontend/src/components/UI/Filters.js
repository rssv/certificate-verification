import React, {useContext} from 'react';
import AuthContext from '../../context/auth-context';
import classes from './Filter.module.css';

const Filters = (props) => {

    const ctx = useContext(AuthContext);
    const changeHandler = (event) => {
        //console.log(event.target.value);
        props.filtersChangeHandler(event.target.id, event.target.value);
    }

    const show = (ctx.action !== "View Signed Result" && 
                    ctx.action !== "Generate Final Results" &&
                    ctx.action !== "View Final Results" &&
                    ctx.action !== "Sign Final Results" &&
                    ctx.action !== "Signed Final Results" )
    
    return (
        <React.Fragment>
            <div className={classes.search_header}>
                <h1>Search Students</h1>
                <div className={classes.filters_form}>
                    {ctx.user.role === "Instructor" && <div className={classes.filters}>
                        <select name="subject" id="subject" onChange={changeHandler}>
                            <option value="">Subject</option>
                            {props.subjects.map((sub, i) => {
                                return <option value={sub} key={i}>{sub}</option>
                            })}
                        </select>
                    </div>}
                    {ctx.user.role !== "Instructor" && <div className={classes.filters}>
                        <select name="dept" id="dept" onChange={changeHandler}>
                            <option value="">Department</option>
                            <option value="Department1">Department1</option>
                            <option value="Department2">Department2</option>
                            <option value="Department3">Department3</option>
                        </select>
                    </div>}
                    {show && <div className={classes.filters}>
                        <select name="session" id="session" onChange={changeHandler}>
                            <option value="">Session</option>
                            <option value="2020-21">2020-21</option>
                            <option value="2021-22">2021-22</option>
                        </select>
                    </div>}
                    {show && <div className={classes.filters}>
                        <select name="semType" id="semType" onChange={changeHandler}>
                            <option value="">Semester Name</option>
                            <option value="Monsoon">Monsoon</option>
                            <option value="Winter">Winter</option>
                        </select>
                    </div>}
                    {show && <div className={classes.filters}>
                        <select name="semNo" id="semNo" onChange={changeHandler}>
                            <option value="">Semester No.</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>}
                    <div className={classes.filters}>
                        <input type="text" id="admNo" onChange={changeHandler} placeholder="Admission No." />
                        
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default Filters;