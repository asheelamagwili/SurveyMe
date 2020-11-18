import {LOGIN_SUCCESS, LOGIN_ERROR} from '../constants/types';

// Handle backend API call for login
export function postLogin(userInfo){
    const user = {
        email: userInfo.email,
        password: userInfo.password
    };
    console.log('Logging in user:', user.email)

    return function (dispatch) {
        return fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            }),
        })
        .then(res => res.json())
        .then(json => {
            return dispatch({ 
                type: LOGIN_SUCCESS,
                payload: json
            });
        })
        .catch((error) => {
            console.error("Error:", error);
            dispatch({ type: LOGIN_ERROR });
        })
    }
};