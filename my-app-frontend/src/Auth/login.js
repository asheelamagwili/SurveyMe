import React from 'react';
import { Box, Grommet, Form, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import LoginButton from '../Components/Button.stories';

const Login = () => {
    return (
        <div>
            <LoginForm />
        </div>
    )
}

const LoginForm = () => {
    const [value, setValue] = React.useState({
        email: "",
        password: ""
    });

    return (
        <Grommet theme={grommet}>
            <Box fill align="center" justify="center">
                <Box width="medium">
                    <Form value={value} onChange={(nextValue) => setValue(nextValue)} onSubmit={() => postLogin(value)}>

                        <FormField label="Email" name="email" required>
                            <TextInput name="email" type="email" />
                        </FormField>

                        <FormField label="Password" name="password" required>
                            <TextInput name="password" type="password" />
                        </FormField>

                        <LoginButton label="Login" type="submit"/>
                    </Form>
                </Box>
            </Box>
        </Grommet>
    )
};

// Handle backend API call
function postLogin(userInfo){
    //event.preventDefault();
    const user = {
        email: userInfo.email,
        password: userInfo.password
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
    .then((res) => console.log(res))
    .then(()=> console.log('Fetch is working (:'))
    .catch((error) => {
        console.error("Error:", error);
    })
};

export default Login;