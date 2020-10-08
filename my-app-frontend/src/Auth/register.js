import React from 'react';

const Register = () => {
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={postRegister}>
                <label> Name </label>
                <input type="text" name="name" id="name" onChange={(e)=>console.log(e.target.value)}/>

                <label> Email </label>
                <input type="text" name="email" id="email" onChange={(e)=>console.log(e.target.value)}/>

                <label> Password </label>
                <input type="password" name="password" id="password" onChange={(e)=>console.log(e.target.value)}/>

                <button type="submit"> Register </button>
            </form>
        </div>
    )
}

// Handle backend API call
function postRegister(event){
    console.log('Inside postRegister');
    event.preventDefault();
    const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    console.log('After creating user:', user.email)

    // Check if users are null
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
        .then(()=> console.log('Fetch is working (:'))
        .catch((error) => {
            console.error("Error:", error);
        })
    }
    else {
        console.log('User was null or undefined');
    }
};

export default Register;