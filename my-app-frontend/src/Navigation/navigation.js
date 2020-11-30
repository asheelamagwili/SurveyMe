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


//const Navigation = () => {
class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.toDashboard = this.toDashboard.bind(this);
    }

    toDashboard() {
        this.props.history.push({pathname: '/surveys'});
    }

    render() {
        let min_nav_component;
        let nav_component;
        if(this.props.loginSuccess) {
            min_nav_component = [
                { label: 'Dashboard', onClick: () => { this.toDashboard() }},
                { label: 'Profile', onClick: () => {} },
            ];

            nav_component = (
                <Nav direction="row">
                    <Anchor href="/surveys" label="Dashboard" />
                    <Anchor href="/profile" label="Profile" />
                </Nav>
            )
        }
        else {
            min_nav_component = [
                { label: 'Home', onClick: () => {} },
                { label: 'Register', onClick: () => {} },
                { label: 'Login', onClick: () => {} },
            ]

            nav_component = (
                <Nav direction="row">
                    <Anchor href="/" label="Home" />
                    <Anchor href="/register" label="Sign Up" />
                    <Anchor href="/login" label="Login" />
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