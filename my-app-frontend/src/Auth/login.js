import { Box, Button, Grommet, Form, FormField, Heading, TextInput, Grid, Text } from 'grommet';
import { postLogin } from '../redux-items/actions/login-actions';
import { Divider } from '../Components/Divider';
import { connect } from 'react-redux';
import React from 'react';

function mapStateToProps(state) {
    return {
      loginSuccess: state.loginSuccess,
      userData: state.userData
    };
}

const Login = ({...props}) => {
    const [value, setValue] = React.useState({
        email: "",
        password: ""
    });

    function sendAndRedirect(value) {
        props.postLogin(value);
        props.history.push({
            pathname: '/profile',
            state: value
        });
    }

    return (
        <Grommet theme={theme}>
            <Box fill align="center" justify="center">
                <Heading level={2} size="large">
                    Login
                </Heading>
                <Box width="medium">
                    <Form value={value} onChange={(nextValue) => setValue(nextValue)}>

                        <FormField label="Email" name="email" required>
                            <TextInput name="email" type="email" />
                        </FormField>

                        <FormField label="Password" name="password" required>
                            <TextInput name="password" type="password" />
                        </FormField>

                        <Grid columns={{count: 'fit', size: 'small'}} gap="medium">
                            <Button label="Login" type="submit" onClick={() => sendAndRedirect(value)}/>
                            <Divider/>
                            <Text textAlign="center">Don't have an account?</Text>
                            <Button label="Sign Up" onClick={() => props.history.push('/register')} path="/login"/>
                        </Grid>
                    </Form>
                </Box>
            </Box>
        </Grommet>
    )
};

const theme = {
    themeMode: 'light',
    global: {
      font: {
        family: 'Lora'
      },
    },
    heading: {
      extend: `color: #233C33`
    },
    button: {
        extend: `border-color: #B5B2C2`,
        hoverIndicator: {
            color: '#B5B2C2',
        }
    }
};

export default connect(mapStateToProps, { postLogin })(Login);