import React, { Fragment } from 'react';

let sideButtonsInstance: React.JSX.Element = <div></div>; 

const AuthActionContext = React.createContext({
    action: 'Verify Result',
    isLoggedIn: false,
    user: {
        username: '',
        name: '',
        role:'',
        access_token: ''
    },
    sideButtons: sideButtonsInstance,
    onActionChange: (newAction: string) => {},
    changeSideButtons: (newSideButtons: React.JSX.Element) => {}
});

export default AuthActionContext;