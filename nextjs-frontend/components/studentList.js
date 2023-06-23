import { useState, useEffect, useContext, useReducer} from "react";
import classes from "./studentList.module.css";
import AuthContext from "../../context/auth-context";
import Filters from "../UI/Filters";

const listReducer = (state, action) => {

    switch(action.type){
        case 'SET_FILTERS':
            state = {...state, filters: action.filters}
        break;
        case 'APPLY_FILTERS':{
            let newList = action.list;
            let subList = [];
            if(state.filters.admNo){
                newList = newList.filter((s) => s.admNo.startsWith(state.filters.admNo));
            }
            if(state.filters.session){
                newList = newList.filter((s) => s.semSession === state.filters.session);
            }
            if(state.filters.semNo){
                newList = newList.filter((s) => s.semNo === state.filters.semNo);
            }
            if(state.filters.semType){
                newList = newList.filter((s) => s.semType === state.filters.semType);
            }
            subList = newList;
            if(state.filters.subject){
                newList = newList.filter((s) => s.subjects.subName === state.filters.subject);
            }
            let subs = [];
            if(state.filters.admNo || state.filters.session || state.filters.semNo || state.filters.semType){
                const subSet = new Set();
                subList.forEach(stude => {
                    subSet.add(stude.subjects.subName)
                });
                subSet.forEach((e) => {
                    subs.push(e);
                })
            }
            
            state = {filters: state.filters, list: newList, allSubjects: subs};
        }
        break;
        case 'CHANGE_SUBJECT_MARKS':{
            let newState = state;
            newState.list[action.idx].subjects.marks = action.marks;
            state = newState;
        }
        break;
    }
    
    return {...state};
}

const StudentList = (props) => {
    const ctx = useContext(AuthContext);
    const [studentListDisplay, setStudentListDisplay] = useReducer(listReducer, {
        filters: {
            admNo: '',
            semNo: '',
            semType: '',
            session: '',
            subject: ''
        },
        list: [],
        allSubjects: []
    })
    const [formSubmitted, setFormSubmitted] = useState(false);
    const filtersChangeHandler = (key, value) => {
        setFormSubmitted(false);
        switch(key){
            case "admNo": {
                let newFilters = {...studentListDisplay.filters, admNo: value}
                setStudentListDisplay({type: 'SET_FILTERS', filters: newFilters})
            }
            break;
            case "session": {
                let newFilters = {...studentListDisplay.filters, session: value}
                setStudentListDisplay({type: 'SET_FILTERS', filters: newFilters})
            }
            break;
            case "semNo": {
                let newFilters = {...studentListDisplay.filters, semNo: value}
                setStudentListDisplay({type: 'SET_FILTERS', filters: newFilters})
            }
            break;
            case "semType": {
                let newFilters = {...studentListDisplay.filters, semType: value}
                setStudentListDisplay({type: 'SET_FILTERS', filters: newFilters})
            }
            break;
            case "subject": {
                let newFilters = {...studentListDisplay.filters, subject: value}
                setStudentListDisplay({type: 'SET_FILTERS', filters: newFilters})
            }
            break;
        }
    }

    const fetchStudentList = async (accessToken) => {
        let response;
        try{
            response= await fetch(`http://localhost:4000/student/instructor/${ctx.user.username}/submit`,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
                },
                credentials: 'include'
            })
        } catch(e){
            alert(e.message);
        }

        if(response.status === 403){
            response = await response.json();
            throw new Error('Forbidden');
        }
        response = await response.json();
        if(response.message === "jwt expired")
            throw new Error("jwt expired")
        return response
    }

    useEffect(() => {
        let proceed = true;
        fetchStudentList(ctx.user.accessToken).then((data) => {
            if(proceed)
                setStudentListDisplay({type: 'APPLY_FILTERS', list: data});
        }).catch(async(err) => {
            if(proceed){
                if(err.message === "jwt expired"){
                    let token = await ctx.refreshToken();
                    fetchStudentList(token).then((data) => {
                        if(proceed)
                            setStudentListDisplay({type: 'APPLY_FILTERS', list: data});
                    }).catch((err) => {
                        if(proceed){
                            if(err.message === "jwt expired"){
                                ctx.updateAppState({
                                    sideButton: 'Verify Certificate',
                                    action: 'Verify Certificate',
                                    user: '',
                                    refreshToken: '',
                                    updateAppState: ''
                                });
                            }
                            alert(err.message);
                        }
                        
                    })
                }     
                else alert(err.message)
            }
            
        }) 

        return () => {
            proceed = false;
        };
    }, [studentListDisplay.filters])
    
    const inputChangeHandler = (event) => {
        setStudentListDisplay({type: 'CHANGE_SUBJECT_MARKS', marks: event.target.value, idx: event.target.id});
    } 

    const updateStudentMarks = async (accessToken, bodyData) => {
        let response;
        try{
            response= await fetch("http://localhost:4000/students/marks", {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${accessToken}`
                },
                credentials: 'include',
                body: JSON.stringify(bodyData)
            })
        } catch(e){
            alert(e.message);
        }

        if(response.status === 403){
            response = await response.json();
            throw new Error('Forbidden');
        }
        response = await response.json();
        if(response.message === "jwt expired")
            throw new Error("jwt expired")
        return response
    }


    const formSubmitHandler = (event) => {
        let dataArr = studentListDisplay.list.map((student) => {
            let data = {
                name: student.name,
                admNo: student.admNo,
                semNo: student.semNo,
                subject: {
                  code: student.subjects.code,
                  marks: student.subjects.marks
                }
            }
            return data;
        })
        let reqData = {
            students: dataArr
        }
        event.preventDefault();
        
        updateStudentMarks(ctx.user.accessToken, reqData)
        .catch(async(err) => {
            if(err.message === "jwt expired"){
                let token = await ctx.refreshToken();
                updateStudentMarks(token, reqData)
                .catch((err) => {
                    if(err.message === "jwt expired"){
                        ctx.updateAppState({
                            sideButton: 'Verify Certificate',
                            action: 'Verify Certificate',
                            user: '',
                            refreshToken: '',
                            updateAppState: ''
                        });
                    }
                    alert(err.message);
                })
            }     
            else alert(err.message)
        }) 
        setFormSubmitted(true);
    }
    console.log(studentListDisplay.list);
    return (
        <div className={classes.contents}>
            <Filters filtersChangeHandler={filtersChangeHandler} subjects={studentListDisplay.allSubjects} />
            {formSubmitted && <h1>Marks Submitted!</h1>}
            {!formSubmitted && !!studentListDisplay.list.length && <form className={classes.marks_form} onSubmit={formSubmitHandler}>
                <div className={classes.empty} />

              <table className={classes.table}>
                  <thead></thead>
                  <tbody>
                  <tr className={classes.row}>
                      <th className={classes.column_header}>Student Name</th>
                      <th className={classes.column_header}>Admission Number</th>
                      <th className={classes.column_header}>{`${studentListDisplay.list[0].subjects.subName} Marks`}</th>
                  </tr>
                  {studentListDisplay.list.map((student, i)=>{
                      return (
                        <tr className={classes.row} key={i}>
                            <td className={classes.data}>{student.name}</td>
                            <td className={classes.data}>{student.admNo}</td>
                            <td className={classes.data}>
                                <input type="text" value={student.subjects.marks} className={classes.marks_input} id={i} required onChange={inputChangeHandler} />
                            </td>
                        </tr>
                      )
                  })}
                  </tbody>
              </table>
              <div className={classes.empty} />
              <button type="submit" className={classes.marks_submit}>Submit</button>
            </form>}
          </div>
    )
}

export default StudentList;