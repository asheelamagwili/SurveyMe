import React from 'react';
import { Box, Grommet, Form, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import LoginButton from '../Components/Button.stories';

const LoginForm = () => (
  <Grommet theme={grommet}>
    <Box fill align="center" justify="center">
      <Box width="medium">

        <Form>
          <FormField label="Email" name="email" required>
            <TextInput name="email" type="email" />
          </FormField>
        </Form>

        <Form>
          <FormField label="Password" name="password" required>
            <TextInput name="password" type="password" />
          </FormField>

        <LoginButton label="Login"/>
        </Form>
      </Box>
    </Box>
  </Grommet>
);

export default LoginForm;