import React, { useState } from 'react';
import { Box, Button, CheckBoxGroup, Form, FormField, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const Questions = () => {
    return (
        <div>
            <SearchSelect/>
        </div>
    )
};

const defaultOptions = [];
defaultOptions.push('Checkbox');
defaultOptions.push('True or False');
defaultOptions.push('Multiple Choice');

const SearchSelect = () => {
    const [options, setOptions] = useState(defaultOptions);
    const [value, setValue] = useState('');
  
    return (
        <Grommet full theme={grommet}>
            <Box fill align="center" justify="start" pad="large">
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

const Checkbox = () => {
    const [value, setValue] = useState();

    return (
        <Grommet theme={grommet}>
        <Box pad="medium" width="medium">
            <Form onSubmit={({ value: values, touched }) =>
                // 'touched' is a single boolean value indication of
                // whether any of the checkboxes had changed.
                console.log('Submit', values, touched)
            }>
            <FormField name="controlled">
                <CheckBoxGroup
                id="check-box-group-id"
                name="controlled"
                value={value}
                onChange={({ value: nextValue }) => setValue(nextValue)}
                />
            </FormField>
            <Button type="submit" label="Submit" />
            </Form>
        </Box>
        </Grommet>
    );
}

export default Questions;