const jwt = require('jsonwebtoken');

export const isAuthenticated = () => {
    try{
        var token = localStorage.getItem('token');
        return jwt.verify(token, process.env.REACT_APP_ACCESS_TOKEN);
    }catch(e) {

    }
    return false;
};
