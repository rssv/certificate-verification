import React, {useEffect, useState} from "react";
import "./App.css"
import SidePaneInstructor from "./components/UI/SidePaneInstructor";
import MainHeader from "./components/UI/MainHeader";
import SidePaneDean from "./components/UI/SidePaneDean";
import SidePaneAdean from "./components/UI/SidePaneAdean";
import SidePaneHome from "./components/UI/SidePaneHome";
import AuthContext from "./context/auth-context";
import PublicActions from "./components/UI/PublicActions";
import InstructorActions from "./components/UI/InstructorActions";
import DeanActions from "./components/UI/DeanActions";
import AdeanActions from "./components/UI/AdeanActions";

function App() {
  const [appState, setAppState] = useState({
    sideButton: 'Verify Certificate',
    action: 'Verify Certificate',
    user: '',
    refreshToken: '',
    updateAppState: ''
  });

  const changeAppState = (state) => {
    setAppState(state);
  } 

  const onSidePaneClickHandler = (side_button, header_action) => {
    setAppState((prevState) => {
      return {...prevState, sideButton: side_button, action: header_action,}
    })
  }
  const refreshTokenHandler = async() => {
    let tokenData;
    try{
      tokenData = await fetch("http://localhost:4000/token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      tokenData = await tokenData.json();
      setAppState((prevState) => {
        const prevUser = prevState.user;
        const newUser = {...prevUser, accessToken: tokenData.accessToken};
        return {...prevState, user: newUser};
      })
      
    }catch(e){
      setAppState({
        sideButton: 'Verify Certificate',
        action: 'Verify Certificate',
        user: '',
        refreshToken: '',
        updateAppState: ''
      })
    }
    return tokenData.accessToken;
  }
  const loginHandler = (data) => {
    fetch("http://localhost:4000/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }).then((response) => {
      if(response.status === 400)
        throw new Error('Username and password are required.')
      else if( response.status === 401)
        throw new Error('Unauthorized')
      return response.json()
    })
    .then((resData) => {
      
      let side_button = '';
      let header_action = '';
      if(resData.role === 'Instructor'){
        side_button = 'Marks Upload';
        header_action = 'Marks Upload';
      }
      else if(resData.role === 'aDean'){
        side_button = 'Approve Result';
        header_action = 'Approve Result';
      }
      else if(resData.role === 'Dean'){
        side_button = 'Sign Result';
        header_action = 'Sign Result';
      }
      else{
        side_button = 'Verify Certificate';
        header_action = 'Verify Certificate';
      }
      const newState = {
        sideButton: side_button,
        action: header_action,
        user: resData,
        refreshToken: refreshTokenHandler,
        updateAppState: changeAppState
      };
      setAppState(newState);
    }).catch((err) => {alert(err.message)})
  }

  const logoutHandler = () => {
    fetch("http://localhost:4000/logout", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    setAppState({
      sideButton: 'Verify Certificate',
      action: 'Verify Certificate',
      user: '',
      refreshToken: '',
      updateAppState: ''
    })
  }
  return (
    <AuthContext.Provider value={appState}>  
        <MainHeader actionTitle={appState.action} user={appState.user} logoutHandler={logoutHandler}/>
        <div className="navigationContent">
            {!appState.user && <React.Fragment>
                    <SidePaneHome onChange={onSidePaneClickHandler} /><PublicActions onLogin={loginHandler} />
                </React.Fragment>}
            {appState.user.role === 'Dean' && <React.Fragment>
                    <SidePaneDean onChange={onSidePaneClickHandler} /><DeanActions />
                </React.Fragment>}
            {appState.user.role === 'aDean' && <React.Fragment>
                    <SidePaneAdean onChange={onSidePaneClickHandler} /><AdeanActions />
                </React.Fragment>}
            {appState.user.role === 'Instructor' && <React.Fragment>
                <SidePaneInstructor onChange={onSidePaneClickHandler} /><InstructorActions />
            </React.Fragment>}
        </div>
        
    </AuthContext.Provider>
  );
}

export default App;
