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
            answer: '',
            user_question: '',
            question_id: '',
            answers: []
        }

        this.toDashboard = this.toDashboard.bind(this);
        this.sendAndRedirect = this.sendAndRedirect.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    componentDidMount() {
        cur_survey = this.props.location.state;
        this.props.getQuestions(this.props.location.state)
        this.setState({
            questions: [],
            title: cur_survey.title,
            answers: [{
                user_id: '',
                user_answer: '',
                question_id: ''
            }]
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
    handleAnswer = (i, q_id) => event => {
        const new_answers = this.state.answers.map((answer, idx) => {
            if(i !== idx)
                return answer;
            else {
                return {
                    ...answer,
                    user_id: '5fb4ebf03f4d3de6d5f4628c',
                    user_answer: event.target.value,
                    question_id: q_id
                };
            }
        })
        console.log('New Answers: ');
        console.log(new_answers);
        this.setState({answers: new_answers});
        //this.state.answers.push(new_answers);
    }

    // Send the redux actions then redirect to the successful submit page
    sendAndRedirect() {
        console.log('Sending form to redux: ');
        console.log(this.state.answers);
        this.props.postAnswer(this.state.answers);
    }

    render() {
        let component;

        // Survey is public -> populate the questions
        if(this.props.location.state.isOpen === true) {
            const res_data = this.props.surveyData;
            for(let i in res_data) {
                this.state.questions.push(res_data[i]);
                console.log("Question #" + i + res_data[i].question);
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
                                <FormField name="answer" label={cur_question.question} required>
                                    <TextInput name="answer" type="text" onChange={() => this.handleAnswer(i, cur_question._id)} />
                                </FormField>
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