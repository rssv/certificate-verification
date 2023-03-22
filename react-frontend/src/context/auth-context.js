import React from 'react';

const AuthContext = React.createContext({
    sideButton: '',
    action: '',
    user: '',
    refreshToken: ''
});

export default AuthContext;