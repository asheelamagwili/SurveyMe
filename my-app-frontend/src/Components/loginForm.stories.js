import React from 'react';
import { Box, Button, Grommet, Form, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

const loginForm = () => (
    <Grommet theme={grommet}>
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            validate="blur"
            onReset={event => console.log(event)}

          >
              <FormField label="Email" name="email" required>
                  <TextInput name="email" type="email" />
              </FormField>

              <FormField label="Password" name="password" required>
                  <TextInput name="password" type="password" />
              </FormField>
  
              <Box direction="row" justify="between" margin={{ top: 'medium' }}>
                  <Button label="Cancel" />
                  <Button type="reset" label="Reset" />
                  <Button type="submit" label="Update" primary />
              </Box>

          </Form>
        </Box>
      </Box>
    </Grommet>
);

export default loginForm;