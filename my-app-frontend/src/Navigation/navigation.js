import { grommet } from 'grommet/themes';
import { Box, Grommet, ResponsiveContext, Anchor, Menu, Nav, Header } from 'grommet';
import React from 'react';
import { Link } from "react-router-dom";


const Navigation = () => {

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
                            items={[
                                { label: 'Survey Dashboard', onClick: () => {} },
                                { label: 'Profile', onClick: () => {} },
                                { label: 'Login', onClick: () => {} },
                            ]}
                            />
                        ) : (
                            <Nav direction="row">
                                <Anchor href="/surveys" label="Dashboard" />
                                <Anchor href="/profile" label="Profile" />
                                <Anchor href="/login" label="Login" />
                            </Nav>
                        )
                    }
                </ResponsiveContext.Consumer>
            </Header>
        </Grommet>
    )
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

export default Navigation;