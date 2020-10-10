import React from 'react';
//import { storiesOf } from '@storybook/react';
import { grommet, Box, Button, Grommet } from 'grommet';

const formSubmitButton = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="medium">
      <Button onClick={() => {}} {...props} />
    </Box>
  </Grommet>
);

export default formSubmitButton;
//storiesOf('Button', module).add('Login', () => <loginButtons />);