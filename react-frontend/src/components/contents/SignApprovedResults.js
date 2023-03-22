import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../../context/auth-context';
import classes from './studentList.module.css'
import ViewResult from "./ViewResult";
import Filters from '../UI/Filters';

const SignApprovedResults = () => {
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

    const [buttonName, setButtonName] = useState("Sign");
    const [studentListDisplay, setStudentListDisplay] = useState([]);
    const ctx = useContext(AuthContext);

    const fetchApprovedResults = async (accessToken) => {
        let response;
        try{
            response= await fetch("http://localhost:4000/results/approved",{
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

        fetchApprovedResults(ctx.user.accessToken).then((data) => {
            //setApprovedResult(data);
            setFilterDisplay(filters, data);
        }).catch(async(err) => {
            if(err.message === "jwt expired"){
                let token = await ctx.refreshToken();
                fetchApprovedResults(token).then((data) => {
                    //setApprovedResult(data);
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
            fetchApprovedResults(ctx.user.accessToken).then((data) => {
                //setApprovedResult(data);
                setFilterDisplay(filters, data);
            }).catch(async(err) => {
                if(err.message === "jwt expired"){
                    let token = await ctx.refreshToken();
                    fetchApprovedResults(token).then((data) => {
                        //setApprovedResult(data);
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

    const viewHandler = (event) => {
        setViewResult({
            flag: true,
            data: studentListDisplay[event.target.id]
        })
    }

    const fetchStoreHash = async (accessToken, bodyData) => {
        let response;
        try{
            response= await fetch("http://localhost:4000/result/storeHash-new", {
                method: 'POST',
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
        console.log(response, "response");
        response = await response.json();
        if(response.message === "jwt expired")
            throw new Error("jwt expired")
        return response
    }

    const signHandler = (event) => {

        setButtonName("Signing...");
        
        let data = {
            admNo: viewResult.data.admNo,
            semNo: viewResult.data.semNo
        }

        fetchStoreHash(ctx.user.accessToken, data).then(() => {
            // setApprovedResult((prev) => {
            //     let newState = prev.filter((s) => {
            //         return ((s.admNo !== viewResult.data.admNo) || (s.semNo !== viewResult.data.semNo))
            //     })
            //     return newState;
            // })

            setStudentListDisplay((prev) => {
                let newState = prev.filter((s) => {
                    return ((s.admNo !== viewResult.data.admNo) || (s.semNo !== viewResult.data.semNo))
                })
                return newState;
            })

            setViewResult({
                flag: false,
                data: null
            })

            setButtonName("Sign")

        }).catch(async(err) => {
            console.log(err, "errrrrr")
            if(err.message === "jwt expired"){
                let token = await ctx.refreshToken();
                fetchStoreHash(token, data).then(() => {
                    // setApprovedResult((prev) => {
                    //     let newState = prev.filter((s) => {
                    //         return ((s.admNo !== viewResult.data.admNo) || (s.semNo !== viewResult.data.semNo))
                    //     })
                    //     return newState;
                    // })

                    setStudentListDisplay((prev) => {
                        let newState = prev.filter((s) => {
                            return ((s.admNo !== viewResult.data.admNo) || (s.semNo !== viewResult.data.semNo))
                        })
                        return newState;
                    })

                    setViewResult({
                        flag: false,
                        data: null
                    })  
                    
                    setButtonName("Sign")

                }).catch((err) => {
                    console.log(err, "errrrrr")
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

        // fetch("http://localhost:4000/result/storeHash", {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then((data) => {
        //     console.log(data)
        //     setApprovedResult((prev) => {
        //         let newState = prev.filter((s) => s.admNo !== viewResult.data.admNo)
        //         return newState;
        //     })
    
        //     setViewResult({
        //         flag: false,
        //         data: null
        //     })
        // })
        // .catch((err) => alert('something went wrong')) 
        
       
    }

    const denyHandler = (event) => {
        setViewResult({
            flag: false,
            data: null
        })
    }

    return (
        <React.Fragment>
            {viewResult.flag && <ViewResult studentData={viewResult.data} approveHandler={signHandler} denyHandler={denyHandler} buttonName={buttonName}/>}
            <div className={classes.contents}>
                <Filters filtersChangeHandler={filtersChangeHandler} />
                <div className={classes.marks_form}>
                    <div className={classes.empty} />
                    {!studentListDisplay.length && <h3>No Approved Results</h3>}
                    {!!studentListDisplay.length && <h3>Approved Results</h3>}
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
                                        <button id={i} type="button" onClick={viewHandler}>View</button>
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

export default SignApprovedResults;