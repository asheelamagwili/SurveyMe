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

//const Login = ({...props}) => {
class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.sendAndRedirect = this.sendAndRedirect.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    /*const [value, setValue] = React.useState({
        email: "",
        password: ""
    });*/

    sendAndRedirect(value) {
        console.log('Before postLogin: ' + this.props.loginSuccess)
        this.props.postLogin(value)
        console.log('Login state in login: ' + this.props.loginSuccess)
        localStorage.setItem('login_state', JSON.stringify(this.props.loginSuccess))
        if(this.props.loginSuccess)
            localStorage.setItem('name', this.props.userData.name)
        console.log(this.props.userData);
        this.props.history.push({
            pathname: '/profile',
            state: value
        })
    }

    // Form handlers
    handleEmail(event) {
        this.setState({email: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    render() {
    return (
        <Grommet theme={theme}>
            <Box fill align="center" justify="center">
                <Heading level={2} size="large">
                    Login
                </Heading>
                <Box width="medium">
                    <Form value={this.state.value} onSubmit={() => this.sendAndRedirect(this.state)}>

                        <FormField label="Email" name="email" required>
                            <TextInput name="email" type="email" value={this.state.email} onChange={this.handleEmail} />
                        </FormField>

                        <FormField label="Password" name="password" required>
                            <TextInput name="password" type="password" value={this.state.password} onChange={this.handlePassword}/>
                        </FormField>

                        <Grid columns={{count: 'fit', size: 'small'}} gap="medium">
                            <Button label="Login" type="submit"/>
                            <Divider/>
                            <Text textAlign="center">Don't have an account?</Text>
                            <Button label="Sign Up" onClick={() => this.props.history.push('/register')}/>
                        </Grid>
                    </Form>
                </Box>
            </Box>
        </Grommet>
    )
    }
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