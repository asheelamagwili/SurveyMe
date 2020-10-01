import React from 'react';

// Handle backend API call
function postRegister(event){
    event.preventDefault();
    const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    console.log('After creating user:', user.email)

    fetch('http://localhost:3000/register', {
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
    .then(()=> console.log('Fetch is working (:'))
    .catch((error) => {
        console.error("Error:", error);
    })
};
const Register = () => {
    return (
        <div>
            <h2>Register</h2>
            <form action="/register" method="POST">
                <label> Name </label>
                <input type="text" name="name"/>

                <label> Email </label>
                <input type="text" name="email"/>

                <label> Password </label>
                <input type="password" name="password"/>

                <button type="submit"> Register </button>
            </form>
        </div>
    )
}

export default Register;