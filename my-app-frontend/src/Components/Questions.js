import { Box, Form, Heading } from 'grommet';
import React from 'react';
import { FormField, TextInput } from 'grommet';

export const userQuestions = ({questions, loading}) => {

    if(loading) {
        return <Heading>Loading...</Heading>;
    }

    return (
        <Form>
            {questions.map((question, i) => 
                    <FormField name="answer" key={question._id} label={question.question} required>
                        <TextInput name="answer" type="text" onChange={this.handleAnswer(i, question._id)} />
                    </FormField>
            )
            }
        </Form>
    )

};