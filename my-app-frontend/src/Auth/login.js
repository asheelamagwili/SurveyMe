import React from 'react';
import LoginButtons from '../Components/Button.stories';
import LoginForm from '../Components/loginForm.stories';

// Handle backend API call
function postLogin(event){
    event.preventDefault();
    const user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    console.log('After logging in user:', user.email)

    fetch('http://localhost:5000/login', {
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
    .then(()=> console.log('Fetch is working (:'))
    .catch((error) => {
        console.error("Error:", error);
    })
};

const Login = () => {
    return (
        <div>
            <h3> Login </h3>
            <LoginForm />
        </div>
    )
}

export default Login;