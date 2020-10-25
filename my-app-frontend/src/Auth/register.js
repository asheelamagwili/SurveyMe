import { Box, Button, Grommet, Heading, Form, FormField, TextInput, Grid, Text, List } from 'grommet';
import { postRegister } from '../redux-items/actions/register-actions';
import {Divider} from '../Components/Divider';
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
        <Grommet theme={theme}>
            <Box fill align="center" justify="center">
                <Heading level={2} size="large">
                    Register
                </Heading>
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

                        <Grid columns={{count: 'fit', size: 'small'}} gap="medium">
                            <Button label="Sign Up" type="submit"/>
                            <Divider/>
                            <Text textAlign="center">Already have an account?</Text>
                            <Button label="Login" onClick={() => props.history.push('/login')}/>
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
            extend: `color: #B5B2C2`,
            background: 'neutral-2'
        }
    }
};

export default connect(mapStateToProps, { postRegister })(Register);