import {REGISTER_SUCCESS, REGISTER_ERROR} from '../constants/action-types';

// Handle backend API call for register
export function postRegister(userInfo){
    console.log('Inside postRegister');
    //event.preventDefault();
    const user = {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password
    };
    console.log('After creating user:', user.email)
    return function (dispatch) {

    if(typeof user === 'undefined') {
        console.log('User undefined!');
    }

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
        })
    }
    else {
        console.log('User was null or undefined');
    }
    }

    //return { type: REGISTER_SUCCESS };
};