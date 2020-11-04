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
        surveyTitle: state.surveyTitle,
        questionsSuccess: state.questionsSuccess,
    };
}

let id;
let title;
let cur_survey;
let questions;

class Questions extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
        };

        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
    }

    componentDidMount() {
        console.log('RUNNING COMPONENTDIDMOUNT')
        cur_survey = this.props.location.state;
        console.log(cur_survey);
        // Initial call to get current data
        this.props.getQuestions(cur_survey);
        // Auto-updates the data on the page by calling getQuestions
        this.interval = setInterval(() => this.setState({time: Date.now()}), 3000);
    }

    // Need to refresh the state so that question can be reloaded
    componentWillMount() {
        clearInterval(this.interval);
    }

    handleChange(event) {
        this.setState({
            answer: event.target.answer,
            question: event.target.question
        });
    }

    handleQuestion(event) {
        this.setState({question: event.target.value});
        //event.preventDefault();
    }

    handleAnswer(event) {
        this.setState({answer: event.target.value});
        //event.preventDefault();
    }

    sendAndRedirect() {
        this.props.postQuestions({
            question: this.state.question,
            answer: this.state.answer,
            survey_id: cur_survey._id,
        });
        this.forceUpdate();
        this.props.getQuestions(cur_survey);
    }

    render () {
        let component;

        // Make sure the survey was retrieved
        if(this.props.surveyData === null || this.props.surveyData === undefined) {
            this.props.getQuestions(this.props.location.state);
            questions = this.props.surveyData;
            questions = 'No questions :(';
        }
        else {
            questions = this.props.surveyData;
        }
        console.log(questions);

        // Check if title and id of desired survey is given
        if(this.props.location.state === null || this.props.location.state === undefined){
            title = 'Cannot find Survey';
        }
        else {
            //title = this.props.surveyData.survey_title;
            title = this.props.location.state.title;
            //id = this.props.surveyData.id;
            id = this.props.location.state.id;
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
                    <Form value={this.state.value} onSubmit={() => this.sendAndRedirect(this.state.value)}>
                        <FormField name="question" label="Question" required>
                            <TextInput name="question" type="text"  value={this.state.question} onChange={this.handleQuestion}/>
                        </FormField>
                        <FormField name="answer" label="Answer" required>
                            <TextInput name="answer" type="text" value={this.state.answer} onChange={this.handleAnswer}/>
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