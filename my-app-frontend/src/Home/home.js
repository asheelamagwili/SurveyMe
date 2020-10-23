import { Box, Grommet, Heading, Image, Text } from 'grommet';
import React from 'react';
import HomeImage from './home.png';

const Home = () => {
    return (
        <Grommet theme={theme}>
            <Box align="center" pad="medium">
                <Heading level={2} size="large">
                    SurveyMe
                </Heading>

                <Image
                    fit="cover"
                    alt="Survey image graphics"
                    src={HomeImage}
                />
            </Box>
        </Grommet>
    )
}

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

export default Home;