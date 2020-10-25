import React, { useState } from 'react';
import { Box, Button, Grommet, Heading, Form, FormField, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { connect } from 'react-redux';
import { postQuestions } from '../redux-items/actions/postQuestion-action';

const defaultOptions = [];
defaultOptions.push('Checkbox');
defaultOptions.push('True or False');
defaultOptions.push('Multiple Choice');

function mapStateToProps(state) {
    return {
      questionsSuccess: state.questionsSuccess,
    };
}

const Questions = ({...props}, survey) => {
    let displayForm = false;
    const [options, setOptions] = useState(defaultOptions);
    const [value, setValue] = React.useState({
        survey_id: survey._id,
        question: "",
        Answers: []
    });

    const sendAndRedirect = (value) => {
        console.log(value);
    }

    return (
        <Grommet theme={theme}>
            <Box fill align="center" justify="evenly">
                <Heading level={2} size="large" alignSelf="center">
                    Add Questions
                </Heading>
                <Form value={value} onChange={(nextValue) => setValue(nextValue)} onSubmit={() => sendAndRedirect(value)}>
                    <FormField name="question" label="Question" required>
                        <TextInput name="question" type="text"/>
                    </FormField>
                    <FormField name="answer" label="Answer" required>
                        <TextInput name="answer" type="text"/>
                    </FormField>

                    <Button label="Add" type="submit"></Button>
                </Form>
            </Box>
        </Grommet>
    );
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
    },
    button: {
        extend: `border-color: #B5B2C2`,
        hoverIndicator: {
            extend: `color: #B5B2C2`,
            background: 'neutral-2'
        }
    }
};

export default connect(mapStateToProps, { postQuestions })(Questions);