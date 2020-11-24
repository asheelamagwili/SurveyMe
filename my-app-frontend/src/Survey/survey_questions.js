import React from 'react';
import { Box, Button, Grommet, Heading, Form, FormField, Accordion, AccordionPanel, TextInput } from 'grommet';
import { connect } from 'react-redux';
import { Divider, Divier } from '../Components/Divider';
import { postQuestions } from '../redux-items/actions/postQuestion-action';
import { getQuestions } from '../redux-items/actions/getQuestion-action'
import { closeSurvey } from '../redux-items/actions/closeSurvey-action';
import { deleteQuestion } from '../redux-items/actions/deleteQuestion-action';

const defaultOptions = [];
defaultOptions.push('Checkbox');
defaultOptions.push('True or False');
defaultOptions.push('Multiple Choice');

function mapStateToProps(state) {
    return {
        surveyData: state.surveyData,
        questionsSuccess: state.questionsSuccess,
        deleteQuestionSuccess: state.deleteQuestionSuccess
    };
}

let id;
let title;
let cur_survey;
let questions;
let data = [];

class Questions extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            curQuestion: '',
            // For pagination
            offset: 0,
            data: [],
            perPage: 1,
            currentPage: 0
        };

        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        //this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        console.log('RUNNING COMPONENTDIDMOUNT')
        cur_survey = this.props.location.state;
        console.log(cur_survey);
        // Initial call to get current data
        this.props.getQuestions(cur_survey);
        // Auto-updates the data on the page by calling getQuestions
        //this.interval = setInterval(() => this.setState({time: Date.now()}), 3000);
    }

    // Form handlers
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
            //answer: this.state.answer,
            survey_id: cur_survey._id,
        });
        this.setState({
            question: '',
            //answer: ''
        });
    }

    navigatePreview(value) {
        this.props.history.push({
            pathname: '/survey/preview',
            state: value
        });
    }

    closeSurvey() {
        this.state.surveyStatus = 'close';
        this.props.closeSurvey(cur_survey);
    }

    deleteQuestion(value) {
        this.props.deleteQuestion(value);
        window.location.reload(false);
    }

    displayStatus() {
        if(this.props.location.state.isOpen)
            return 'Published';
        else
            return 'Private';
    }

    render () {
        let component;

        // Make sure the survey was retrieved from the redux actions' fetch call
        if(this.props.surveyData === null || this.props.surveyData === undefined) {
            this.props.getQuestions(this.props.location.state);
            questions = this.props.surveyData;
            data = [];
            for(let i in questions) {
                data.push(questions[i]);
            }
        }
        else {
            questions = this.props.surveyData;
            data = [];
            for(let i in questions) {
                data.push(questions[i]);
            }
        }

        // Check if title and id of desired survey is given
        if(this.props.location.state === null || this.props.location.state === undefined){
            title = 'Cannot find Survey';
        }
        else {
            title = this.props.location.state.title;
            id = this.props.location.state.id;
        }

        const {animate, multiple, ...rest} = this.props;

        component =  (
            <Grommet theme={theme}>
                <Box fill align="center" justify="evenly">
                    <Heading  margin="small" level={2} size="large" alignSelf="start">
                        {title}
                    </Heading>
                    <Heading margin="small" level={4} alignSelf="start">
                        Survey Status: {this.displayStatus()}
                    </Heading>
                    <Heading level={3}>
                        Add a Question
                    </Heading>
                    <Form value={this.state.value} onSubmit={() => this.sendAndRedirect(this.state.value)}>
                        <FormField name="question" label="Question" required>
                            <TextInput name="question" type="text"  value={this.state.question} onChange={this.handleQuestion}/>
                        </FormField>
                        <Button label="Add" type="submit"></Button>
                    </Form>
                </Box>
                <Divider/>
                <Box margin="large">
                    <Accordion  animate={animate} multiple={multiple}>
                        {data.map((cur_question) =>
                            <AccordionPanel label={cur_question.question}>
                                <Box background="light-2" overflow="auto" height="medium">
                                    <Box height="short" flex={false}>
                                        {cur_question.answer}
                                        <Button margin="small" align="end" label="Delete" onClick={() => this.deleteQuestion(cur_question)}></Button>
                                    </Box>
                                </Box>
                            </AccordionPanel>
                        )}
                    </Accordion>
                    <Box pad="large" >
                        <Divider/>
                        <Button margin="small" label="View Survey Preview" type="submit" onClick={() => this.navigatePreview(cur_survey)}></Button>
                        <Button margin="small" label="Make Survey Private" type="submit" onClick={() => this.closeSurvey(cur_survey)} ></Button>
                    </Box>
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

export default connect(mapStateToProps, { postQuestions, getQuestions, closeSurvey, deleteQuestion })(Questions);