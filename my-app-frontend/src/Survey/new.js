import React from 'react';
import { Box, TextInput, DateInput, Form, FormField, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';


const Create = () => {
    return (
        <CreateForm/>
    )
};

const CreateForm = () => {
    const [value, setValue] = React.useState ({
        title: "",
        description: "",
        isOpen: "",
        startDate: "",
        endDate: ""
    });

    return (
        <Grommet theme={grommet}>
            <Box fill align="center" justify="center">
                <Box width="medium">
                    <Form value={value} onChange={(nextValue) => setValue(nextValue)} onSubmit={() => console.log('Posting new surey')}>
                        <FormField label="Survey Title" name="title" required>
                            <TextInput name="title" type="text" />
                        </FormField>

                        <FormField label="Description" name="description" required>
                            <TextInput name="description" type="text" />
                        </FormField>

                        <FormField name="startDate" label="Start Date" required>
                            <DateInput name="startDate" format="mm/dd/yyyy" />
                        </FormField>

                        <FormField name="endDate" label="End Date" required>
                            <DateInput name="endDate" format="mm/dd/yyyy" />
                        </FormField>

                    </Form>
                </Box>
            </Box>
        </Grommet>
    )
};

export default Create;