import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../../context/auth-context';
import classes from './studentList.module.css'
import ViewSignDetails from './ViewSignDetails';
import Filters from '../UI/Filters';
import ViewFinalResults from './ViewFinalResults';

const SignedFinalResults = () => {
    const [filters, setFilters] = useState({
        admNo: '',
        semNo: '',
        semType: '',
        dept: '',
        session: ''
      });
    
    const [viewResult, setViewResult] = useState({
        flag:false,
        data:null
    });
    const [viewSignDetails, setViewSignDetails] = useState({
        flag:false,
        data:null
    });
    const [studentListDisplay, setStudentListDisplay] = useState([]);
    const ctx = useContext(AuthContext);
    const fetchSignedResults = async (accessToken) => {
        let response;
        try{
            response= await fetch("http://localhost:4000/results/final-signed",{
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

    const setFilterDisplay = (currState, list) => {
        let newList = list;
        if(currState.admNo){
            newList = newList.filter((s) => s.admNo.startsWith(currState.admNo));
        }
        if(currState.session){
            newList = newList.filter((s) => s.semSession === currState.session);
        }
        if(currState.semNo){
            newList = newList.filter((s) => s.semNo === currState.semNo);
        }
        if(currState.semType){
            newList = newList.filter((s) => s.semType === currState.semType);
        }
        if(currState.dept){
            newList = newList.filter((s) => s.department === currState.dept);
        }
        setStudentListDisplay(newList);
    }
    const filtersChangeHandler = (key, value) => {
        console.log("entered filtersChangeHandler")
        switch(key){
            case "admNo": {
                setFilters((prevState) => {
                    let newState = {
                        admNo: value,
                        semNo: prevState.semNo,
                        semType: prevState.semType,
                        dept: prevState.dept,
                        session: prevState.session
                    };
                    //setFilterDisplay(newState);
                    return newState;
                });
                console.log(filters);
            }
            break;
            case "session": {
                setFilters((prevState) => {
                    let newState = {
                        admNo: prevState.admNo,
                        semNo: prevState.semNo,
                        semType: prevState.semType,
                        dept: prevState.dept,
                        session: value
                    };
                    //setFilterDisplay(newState);
                    return newState;
                });
                console.log(filters);
            }
            break;
            case "semNo": {
                setFilters((prevState) => {
                    let newState = {
                        admNo: prevState.admNo,
                        semNo: value,
                        semType: prevState.semType,
                        dept: prevState.dept,
                        session: prevState.session
                    };
                    //setFilterDisplay(newState);
                    return newState;
                });
                console.log(filters);
            }
            break;
            case "semType": {
                setFilters((prevState) => {
                    let newState = {
                        admNo: prevState.admNo,
                        semNo: prevState.semNo,
                        semType: value,
                        dept: prevState.dept,
                        session: prevState.session
                    };
                    //setFilterDisplay(newState);
                    return newState;
                });
                console.log(filters);
            }
            break;
            case "dept": {
                setFilters((prevState) => {
                    let newState = {
                        admNo: prevState.admNo,
                        semNo: prevState.semNo,
                        semType: prevState.semType,
                        dept: value,
                        session: prevState.session
                    };
                    //setFilterDisplay(newState);
                    return newState;
                })
                console.log(filters);
            }
            break;
        }
    }

    useEffect(() => {

        fetchSignedResults(ctx.user.accessToken).then((data) => {
            //setSignedResults(data);
            setFilterDisplay(filters, data);
        }).catch(async(err) => {
            if(err.message === "jwt expired"){
                let token = await ctx.refreshToken();
                fetchSignedResults(token).then((data) => {
                    //setSignedResults(data);
                    setFilterDisplay(filters, data);
                }).catch((err) => {
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
        
        const identifier = setInterval(() => {
            
            fetchSignedResults(ctx.user.accessToken).then((data) => {
                //setSignedResults(data);
                setFilterDisplay(filters, data);
            }).catch(async(err) => {
                if(err.message === "jwt expired"){
                    let token = await ctx.refreshToken();
                    fetchSignedResults(token).then((data) => {
                        //setSignedResults(data);
                        setFilterDisplay(filters, data);
                    }).catch((err) => {
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
        }, 20000);

        return () => clearInterval(identifier)
    
    },[filters])

    const viewResultHandler = (event) => {
        setViewResult({
            flag: true,
            data: studentListDisplay[event.target.id]
        })
    }

    const viewSignDetailsHandler = (event) => {
        setViewSignDetails({
            flag: true,
            data: studentListDisplay[event.target.id].signDetails
        })
    }

   
    const denyHandlerViewResult = (event) => {
        setViewResult({
            flag: false,
            data: null
        })
    }

    const denyHandlerSignDetails = (event) => {
        setViewSignDetails({
            flag: false,
            data: null
        })
    }

    return (
        <React.Fragment>
            {viewResult.flag && <ViewFinalResults studentData={viewResult.data} denyHandler={denyHandlerViewResult} showDeny={true} buttonName={null}/>}
            {viewSignDetails.flag && <ViewSignDetails signDetails={viewSignDetails.data} denyHandler={denyHandlerSignDetails} buttonName={null}/>}
            <div className={classes.contents}>
                <Filters filtersChangeHandler={filtersChangeHandler} />
                <div className={classes.marks_form}>
                    <div className={classes.empty} />
                    {!studentListDisplay.length && <h3>No Final Results</h3>}
                    {!!studentListDisplay.length && <h3>Signed Results</h3>}
                    {!!studentListDisplay.length && <table className={classes.table}>
                        <thead></thead>
                        <tbody>
                        <tr className={classes.row}>
                            <th className={classes.column_header}>Student Name</th>
                            <th className={classes.column_header}>Admission Number</th>
                            <th className={classes.column_header}>Action</th>
                        </tr>
                        {studentListDisplay.map((student, i)=>{
                            return (
                                <tr className={classes.row} key={i}>
                                    <td className={classes.data}>{student.name}</td>
                                    <td className={classes.data}>{student.admNo}</td>
                                    <td className={classes.data}>
                                        <button id={i} type="button" className={classes.action_button} onClick={viewResultHandler}>View Result</button>
                                        <button id={i} type="button" className={classes.action_button}onClick={viewSignDetailsHandler}>Sign Details</button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>}
                    <div className={classes.empty} />
                </div>
            </div>
        </React.Fragment>
    
    )
}

export default SignedFinalResults;