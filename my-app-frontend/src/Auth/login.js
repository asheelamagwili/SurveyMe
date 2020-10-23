import { Box, Button, Grommet, Form, FormField, Heading, TextInput, Grid, Text } from 'grommet';
import { postLogin } from '../redux-items/actions/login-actions';
import { grommet } from 'grommet/themes';
import { connect } from 'react-redux';
import React from 'react';

// Test
function mapStateToProps(state) {
    return {
      loginSuccess: state.loginSuccess,
    };
}

const Login = ({...props}) => {
    const [value, setValue] = React.useState({
        email: "",
        password: ""
    });

    return (
        <Grommet theme={theme}>
            <Box fill align="center" justify="center">
                <Heading level={2} size="large">
                    Login
                </Heading>
                <Box width="medium">
                    <Form value={value} onChange={(nextValue) => setValue(nextValue)} onSubmit={() => props.postLogin(value)}>

                        <FormField label="Email" name="email" required>
                            <TextInput name="email" type="email" />
                        </FormField>

                        <FormField label="Password" name="password" required>
                            <TextInput name="password" type="password" />
                        </FormField>

                        <Grid columns={{count: 'fit', size: 'small'}} gap="medium">
                            <Button label="Login" type="submit"/>
                            <Text textAlign="center">Don't have an account?</Text>
                            <Button label="Sign Up" type="submit"/>
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
    }
};

export default connect(mapStateToProps, { postLogin })(Login);