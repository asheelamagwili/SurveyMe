import React from 'react';

// Handle backend API call
function postLogin(event){
    event.preventDefault();
    const user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    console.log('After creating user')

    fetch('http://localhost:3000/login', {
        method:'POST',
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json",
            'Access-Control-Allow-Origin': "*"
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password
        }) 
    })
    .then(res => res.json())
    .then(()=> console.log('Fetch is working (:'))
};

const Login = () => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={postLogin}>

            <label> Email </label>
            <input type="text" name="email" id="email"/>

            <label> Password </label>
            <input type="text" name="password" id="password"/>
            <button type="submit"> Login </button>
            </form>
        </div>
    )
}

export default Login;