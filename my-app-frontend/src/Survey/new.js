import React from 'react';
import { grommet } from 'grommet/themes';
import { 
    Box, 
    Button, 
    TextInput, 
    DateInput, 
    Form, 
    FormField, 
    Grommet,
    Heading
} from 'grommet';

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

    const sendAndRedirect = (value) => {
        postNewSurvey(value);
    }

    return (
        <Grommet theme={theme}>
            <Box fill align="center" justify="center">
                <Heading level={2} size="large">
                    Create a Survey
                </Heading>

                <Box width="medium">
                    <Form value={value} onChange={(nextValue) => setValue(nextValue)} onSubmit={() => sendAndRedirect(value)}>
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
                        <Button label="Create" type="submit"/>
                    </Form>
                </Box>
            </Box>
        </Grommet>
    )
};

const postNewSurvey = (surveyInfo) => {
    console.log('Inside postNewSurvey');

    const survey = {
        title: surveyInfo.title,
        description: surveyInfo.description,
        isOpen: false,
        startDate: surveyInfo.startDate,
        endDate: surveyInfo.endDate
    }

    console.log('After creating new survey: ' + survey.title);

    if(typeof survey !== 'undefined' && survey !== null) {
        fetch('http://localhost:5000/surveys/new', {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify({
                title: survey.title,
                description: survey.description,
                isOpen: false,
                startDate: survey.startDate,
                endDate: survey.endDate
            }),
        })
        .then(res => res.json())
        .then(() => console.log('Fetch is working :)'))
        .catch((error) => {
            console.error("Error: ", error);
        })
    }
    else {
        console.log('User was null or undefined');
    }
};

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

export default Create;