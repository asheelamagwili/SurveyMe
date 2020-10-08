import React from 'react';
//import { storiesOf } from '@storybook/react';
import { grommet, Box, Button, Grommet } from 'grommet';

const loginButtons = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="medium">
      <Button onClick={() => {}} {...props} />
    </Box>
  </Grommet>
);

export default loginButtons;
//storiesOf('Button', module).add('Login', () => <loginButtons />);