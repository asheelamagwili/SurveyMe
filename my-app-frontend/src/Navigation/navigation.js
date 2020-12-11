import { grommet } from 'grommet/themes';
import { Box, Grommet, ResponsiveContext, Anchor, Menu, Nav, Header } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";


function mapStateToProps(state) {
    return {
      loginSuccess: state.loginSuccess,
    };
}

let min_nav_component;
let nav_component;

window.addEventListener('storage', () => {
    // When local storage changes, dump the list to
    // the console.
    if(localStorage.getItem('login_state') == 'true') {
        min_nav_component = [
            { label: 'Dashboard', onClick: () => { this.toDashboard() }},
            { label: 'Profile', onClick: () => {} },
            { label: 'Logout', onClick: () => {this.handleLogout()} },
        ];

        nav_component = (
            <Nav direction="row">
                <Anchor href="/surveys" label="Dashboard" />
                <Anchor href="/profile" label="Profile" />
                <Anchor href="/home" label="Logout" onClick={this.handleLogout()}/>
            </Nav>
        )
    }
    else {
        min_nav_component = [
            { label: 'Home', onClick: () => {} },
            { label: 'Register', onClick: () => {} },
            { label: 'Login', onClick: () => {this.handleLogin()} },
        ]

        nav_component = (
            <Nav direction="row">
                <Anchor href="/" label="Home" />
                <Anchor href="/register" label="Sign Up" />
                <Anchor to="/login" label="Login"/>
            </Nav>
        )
    }  
});
  

//const Navigation = () => {
class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.toDashboard = this.toDashboard.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


    toDashboard() {
        this.props.history.push({pathname: '/surveys'});
    }

    handleLogout() {
        localStorage.setItem('login_state', "false");
    }

    handleLogin() {
        this.props.history.push({pathname: '/login'});
    }

    render() {
        
        if(localStorage.getItem('login_state') == 'true') {
            min_nav_component = [
                { label: 'Dashboard', onClick: () => { this.toDashboard() }},
                { label: 'Profile', onClick: () => {} },
                { label: 'Logout', onClick: () => {this.handleLogout()} },
            ];

            nav_component = (
                <Nav direction="row">
                    <Anchor href="/surveys" label="Dashboard" />
                    <Anchor href="/profile" label="Profile" />
                    <Anchor href="/home" label="Logout" onClick={this.handleLogout()}/>
                </Nav>
            )
        }
        else {
            min_nav_component = [
                { label: 'Home', onClick: () => {} },
                { label: 'Register', onClick: () => {} },
                { label: 'Login', onClick: () => {this.handleLogin()} },
            ]

            nav_component = (
                <Nav direction="row">
                    <Anchor href="/" label="Home" />
                    <Anchor href="/register" label="Sign Up" />
                    <Anchor href="/login" label="Login"/>
                </Nav>
            )
        }

        return (
            <Grommet theme={theme}>
                <Header pad="medium" background="#5A7D7C">
                    <Box direction="row" align="center" gap="small">
                        <Link to="/" style={{ textDecoration: 'none' }}>SurveyMe</Link>
                    </Box>

                    <ResponsiveContext.Consumer>
                        {responsive =>
                            responsive === 'small' ? (
                                <Menu
                                label="Menu"
                                items = { min_nav_component }
                                />
                            ) : ( nav_component )
                        }
                    </ResponsiveContext.Consumer>
                </Header>
            </Grommet>
        )
    }
}

const theme = {
    global: {
        font: {
          family: 'Lora'
        },
    },
    anchor: {
        color: "white"
    }
};

export default connect(mapStateToProps)(Navigation);