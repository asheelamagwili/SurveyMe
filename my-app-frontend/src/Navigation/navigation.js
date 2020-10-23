import { grommet } from 'grommet/themes';
import { Box, Grommet, ResponsiveContext, Anchor, Menu, Nav, Header } from 'grommet';
import React from 'react';


const Navigation = () => {

    return (
        <Grommet theme={theme}>
            <Header pad="medium" background="#5A7D7C">
                <Box direction="row" align="center" gap="small">
                    SurveyMe
                </Box>

                <ResponsiveContext.Consumer>
                    {responsive =>
                        responsive === 'small' ? (
                            <Menu
                            label="Menu"
                            items={[
                                { label: 'Surveys', onClick: () => {} },
                                { label: 'Profile', onClick: () => {} },
                            ]}
                            />
                        ) : (
                            <Nav direction="row">
                                <Anchor href="/surveys" label="Surveys" />
                                <Anchor href="/profile" label="Profile" />
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