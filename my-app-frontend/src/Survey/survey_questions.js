import React, { useState } from 'react';
import { Box, Button, Grommet, Select, Form, FormField, TextArea } from 'grommet';
import { grommet } from 'grommet/themes';
import { Add } from 'grommet-icons';
import { BrowserRouter } from 'react-router-dom';

const defaultOptions = [];
defaultOptions.push('Checkbox');
defaultOptions.push('True or False');
defaultOptions.push('Multiple Choice');

const Questions = () => {
    let displayForm = false;
    const [options, setOptions] = useState(defaultOptions);
    const [value, setValue] = useState('');

    function displayFormField(){

        return (
            <Form>
                <FormField name="question" label="Question" required>
                    <TextArea name="question" />
                </FormField>
            </Form>
        )
    }

    return (
        <Grommet full theme={grommet}>
            <Box fill align="start" justify="center" margin="small" direction="row" wrap>
                <Select
                    size="medium"
                    placeholder="Select"
                    value={value}
                    options={options}
                    onChange={({ option }) => setValue(option)}
                    onClose={() => setOptions(defaultOptions)}
                    onSearch={text => {
                    // The line below escapes regular expression special characters:
                    // [ \ ^ $ . | ? * + ( )
                    const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
        
                    // Create the regular expression with modified value which
                    // handles escaping special characters. Without escaping special
                    // characters, errors will appear in the console
                    const exp = new RegExp(escapedText, 'i');
                    setOptions(defaultOptions.filter(o => exp.test(o)));
                    }}
                />
                
            </Box>
        </Grommet>
    );
};

export default Questions;