import React from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../redux-items/actions/getQuestion-action';
import { postAnswer } from '../redux-items/actions/postAnswer-action';
import { Box, Grommet, Form, FormField, TextInput, Button, Heading } from 'grommet';
import { Divider } from '../Components/Divider';
import { Link } from 'react-router-dom';


function mapStateToProps(state) {
    return {
      surveyData: state.surveyData,
      displaySurveysSuccess: state.displaySurveysSuccess,
      loginSuccess: state.loginSuccess,

      postAnswerSuccess: state.postAnswerSuccess
    };
};

let cur_survey;

class TakeSurvey extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            title: '',
            answer: ''
        }

        this.toDashboard = this.toDashboard.bind(this);
        this.sendAndRedirect = this.sendAndRedirect.bind(this);
    }

    componentDidMount() {
        cur_survey = this.props.location.state;
        this.props.getQuestions(this.props.location.state)
        this.setState({
            questions: [],
            title: cur_survey.title,
        });
    }

    // Navigate back to the Dashboard
    toDashboard() {
        this.props.history.push('/take');
    }

    // Send the question answers back to the DB
    postAnswer() {
        console.log('Answer: ' + this.state.answer);
    }

    // Handle form fields
    handleAnswer(i, event) {
        this.state.questions[i] = event.target.value;
        this.setState({answer: event.target.value});
        this.sendAndRedirect();
    }

    // Send the redux actions then redirect to the successful submit page
    sendAndRedirect() {
        console.log('Questions: ' + this.state.questions[0].user_answer);
        this.props.postAnswer({
            user_id: '5fb4ebf03f4d3de6d5f4628c', // Hard coding a user for now
            user_answer: "Blue", // Hard coding answer for - form is having an issue
            question_id: "5fd483a5ad3e6409609c1525" // Hard code question id for now - while testing backend
        })
    }

    render() {
        let component;

        // Survey is public -> populate the questions
        if(this.props.location.state.isOpen === true) {
            const res_data = this.props.surveyData;
            for(let i in res_data) {
                this.state.questions.push(res_data[i]);
                console.log("Question: " + i + res_data[i]);
            }

            component = (
                <Grommet theme={theme}>
                    <Box pad="large">
                        <Heading level={3} alignSelf={"center"}>
                            {this.state.title}
                        </Heading>
                    </Box>
                    <Box fill justify="evenly" pad="xlarge">
                        <Form>
                            {this.state.questions.map((cur_question, i) => 
                                <div key={i}>
                                    <FormField name="answer" label={cur_question.question} required>
                                        <TextInput name="answer" type="text" onChange={this.handleAnswer.bind(this, i)} />
                                    </FormField>
                                </div>
                            )}
                        </Form>
                        <Box pad="medium">
                            <Button onClick={this.sendAndRedirect} margin="small" label="Submit Answers"></Button>
                            <Divider></Divider>
                            <Button onClick={this.toDashboard} margin="small" label="Back to Surveys"></Button>
                        </Box>
                    </Box>
                </Grommet>
            )
    
        }

        // Survey is private -> display message and provide a back button
        else {

            component = (
                <Grommet theme={theme}>
                    <Box pad="large">
                        <Heading level={3} alignSelf={"center"}>
                            Survey is Private
                        </Heading>
                    </Box>
                    <Box pad="medium">
                        <Button onClick={this.toDashboard} margin="small" label="Back to Surveys"></Button>
                    </Box>
                </Grommet>
            )
        }

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

{/* <Form>
    {this.state.questions.map((cur_question) => 
        <FormField name="answer" label={cur_question.question} required>
            <TextInput name="answer" type="text" value={this.state.answer} onChange={this.handleAnswer} />
        </FormField>
                            )}
</Form> */}

export default connect(mapStateToProps, { getQuestions, postAnswer })(TakeSurvey);