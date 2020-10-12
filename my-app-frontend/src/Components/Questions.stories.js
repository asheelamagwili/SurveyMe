import React from 'react';
import { grommet, Box, Button, Grommet, Form } from 'grommet';

export function Checkbox(options){
    return (
        <Grommet theme={grommet}>
            <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
                <CheckBoxGroup
                id="group"
                name="checkboxgroup"
                options={options}
                />
            </Box>
        </Grommet>
    )
};

export default Checkbox;