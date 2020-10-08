import React from 'react';
import { Box, Grommet, Form, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import LoginButton from '../Components/Button.stories';

const RegisterForm = (action) => (
  <Grommet theme={grommet}>
    <Box fill align="center" justify="center">
      <Box width="medium">

            <FormField label="Name" name="name" required>
                <TextInput name="name" type="name" />
            </FormField>

            <FormField label="Email" name="email" required>
                <TextInput name="email" type="email" />
            </FormField>

            <FormField label="Password" name="password" required>
                <TextInput name="password" type="password" />
            </FormField>

            <LoginButton label="Login"/>
      </Box>
    </Box>
  </Grommet>
);

export default RegisterForm;