import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
};

export const auth = (email, password, isSignup2) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCNVxk6p_do7Jgw1hyRJxTsN0dm-PjszCs';
        if (!isSignup2) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCNVxk6p_do7Jgw1hyRJxTsN0dm-PjszCs'
        };
         
        axios.post(url, authData)
                .then(res => {
                    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                    localStorage.setItem('token', res.data.idToken);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', res.data.localId);
                    // console.log(res);
                    dispatch(authSuccess(res.data.idToken, res.data.localId));
                    dispatch(checkAuthTimeout(res.data.expiresIn));
                })
                .catch(err => {
                    console.log(err);
                    dispatch(authFail(err.response.data.error));
                })
        
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            if (expirationDate > new Date()) {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) /1000 ));
            } else {
                dispatch(logout());
            }
        }

    }
}