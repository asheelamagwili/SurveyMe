import {REGISTER_SUCCESS, REGISTER_ERROR} from '../constants/types';

// Handle backend API call for register
export function postRegister(userInfo){
    console.log('Inside postRegister');

    const user = {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password
    };

    return function (dispatch) {
        // Check if users are NOT null
        if(typeof user !== 'undefined' && user !== null) {

            fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json",
                    'Access-Control-Allow-Origin': "*"
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password: user.password
                }),
            })
            .then(res => res.json())
            .then(() => console.log('Fetch is working (:'))
            .then((res) => {
                console.log(res);
                dispatch({ type: REGISTER_SUCCESS });
            })
            .catch((error) => {
                console.error("Error:", error);
                dispatch({ type: REGISTER_ERROR });
            })
        }
        else {
            console.log('User was null or undefined');
            dispatch({ type: REGISTER_ERROR });
        }
    }
};