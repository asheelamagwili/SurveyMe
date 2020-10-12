import { Box, Button, Grommet, Form, FormField, TextInput } from 'grommet';
import { postRegister } from '../redux-items/actions/register-actions';
import { grommet } from 'grommet/themes';
import { connect } from 'react-redux';
import React from 'react';

function mapStateToProps(state) {
    return {
      registerSuccess: state.registerSuccess,
    };
}

const Register = ({...props}) => {
    const [value, setValue] = React.useState({
        name: "",
        email: "",
        password: ""
    });

    return (
        <Grommet theme={grommet}>
            <Box fill align="center" justify="center">
                <Box width="medium">
                    <Form value={value} onChange={(nextValue) => setValue(nextValue)} onSubmit={() => props.postRegister(value)}>
                        <FormField label="Name" name="name" required>
                            <TextInput name="name" type="name" />
                        </FormField>

                        <FormField label="Email" name="email" required>
                            <TextInput name="email" type="email" />
                        </FormField>

                        <FormField label="Password" name="password" required>
                            <TextInput name="password" type="password" />
                        </FormField>

                        <Button label="Register" type="submit"/>
                    </Form>
                </Box>
            </Box>
        </Grommet>
    )
};

/*
// Handle backend API call
function postRegister(userInfo){
    console.log('Inside postRegister');
    //event.preventDefault();
    const user = {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password
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
*/

export default connect(mapStateToProps, { postRegister })(Register);