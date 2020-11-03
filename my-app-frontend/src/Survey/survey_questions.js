import React, { useState, setState } from 'react';
import { Box, Button, Grommet, Heading, Form, FormField, TextArea, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { connect } from 'react-redux';
import { postQuestions } from '../redux-items/actions/postQuestion-action';
import { getQuestions } from '../redux-items/actions/getQuestion-action'

const defaultOptions = [];
defaultOptions.push('Checkbox');
defaultOptions.push('True or False');
defaultOptions.push('Multiple Choice');

function mapStateToProps(state) {
    return {
        surveyData: state.surveyData,
        questionsSuccess: state.questionsSuccess,
    };
}

/*
const [value, setValue] = React.useState({
    survey_id: "",
    question: "",
    answer: []
});*/

//const Questions = ({...props}, survey) => {
class Questions extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            survey_id: ''
        };
    }

    componentDidMount() {
        this.props.getQuestions(this.props.location.state);
    }

    handleQuestion(event) {
        this.setState({question: event.target.question,});
    }

    handleAnswer(event) {
        this.setState({answer: event.target.answer});
    }

    sendAndRedirect() {
        this.props.postQuestions({
            survey_id: "asdfasdf", 
            question: this.state.question, 
            answer: this.state.answer
        });
    }

    render () {
        let component;
        let title;
        console.log('Data received: ');
        console.log(this.props.surveyData);

        // Make sure the survey was retrieved
        if(this.props.surveyData === null || this.props.surveyData === undefined) {
            title = 'Cannot find Survey';
        }
        else {
            title = this.props.surveyData.title;
        }

        component =  (
            <Grommet theme={theme}>
                <Box fill align="center" justify="evenly">
                    <Heading level={2} size="large" alignSelf="center">
                        {title}
                    </Heading>
                    <Heading level={3}>
                        Add a Question
                    </Heading>
                    <Form value={this.state.value} onChange={() => this.handleChange} onSubmit={() => this.sendAndRedirect()}>
                        <FormField name="question" label="Question" required>
                            <TextInput name="question" type="text" value={this.state.question} onClick={this.handleQuestion}/>
                        </FormField>
                        <FormField name="answer" label="Answer" required>
                            <TextInput name="answer" type="text" value={this.state.answer} onClick={this.handleAnswer}/>
                        </FormField>

                        <Button label="Add" type="submit"></Button>
                    </Form>
                </Box>
            </Grommet>
        );

        return component;
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
    },
    button: {
        extend: `border-color: #B5B2C2`,
        hoverIndicator: {
            extend: `color: #B5B2C2`,
            background: 'neutral-2'
        }
    }
};

export default connect(mapStateToProps, { postQuestions, getQuestions })(Questions);