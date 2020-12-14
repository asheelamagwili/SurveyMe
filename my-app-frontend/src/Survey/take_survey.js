import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../redux-items/actions/getQuestion-action';
import { postAnswer } from '../redux-items/actions/postAnswer-action';
import { Box, Grommet, Form, FormField, TextInput, Button, Heading } from 'grommet';
import { Divider } from '../Components/Divider';
import {Pagination } from '../Components/Pagination';
import { userQuestions } from '../Components/Questions';
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
            answers: [],
            loading: false,

            currentPage: 1,
            postsPerPage: 1,
            totalQuestions: 0
        }

        this.toDashboard = this.toDashboard.bind(this);
        this.sendAndRedirect = this.sendAndRedirect.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.addAnswerToList = this.addAnswerToList.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        cur_survey = this.props.location.state;
        this.state.loading = true;
        this.props.getQuestions(this.props.location.state);

        // const res_data = this.props.surveyData;
        // let temp = [];
        // for(let i in res_data) {
        //     temp.push(res_data[i]);
        //     console.log("Question #" + i + res_data[i].question);
        //     this.state.totalQuestions = this.state.totalQuestions + 1;
        // }

        this.setState({
            title: cur_survey.title,
            //questions: temp
        });
        
        // this.setState({
        //     questions: [],
        //     title: cur_survey.title,
        //     answers: [{
        //         user_id: '',
        //         user_answer: '',
        //         question_id: ''
        //     }]
        // });
        this.state.loading = false;
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
        // const new_answers = this.state.answers.map((answer, idx) => {
        //     if(i !== idx)
        //         return answer;
        //     else {
        //         return {
        //             ...answer,
        //             user_id: '5fb4ebf03f4d3de6d5f4628c',
        //             user_answer: event.target.value,
        //             question_id: q_id
        //         };
        //     }
        // })
        const new_answer = {
            user_id: '5fb4ebf03f4d3de6d5f4628c',
            user_answer: event.target.value,
            question_id: q_id
        }

        console.log('New Answers: ');
        console.log(new_answer);
        this.setState({answer: new_answer});
    }

    // Pushes answer onto the list
    addAnswerToList() {
        this.state.answers.push(this.state.answer);
    }

    // Send the redux actions then redirect to the successful submit page
    sendAndRedirect() {
        console.log('Sending form to redux: ');
        console.log(this.state.answers);
        this.props.postAnswer(this.state.answer);
        console.log('------------------------------')
        console.log(this.state.currentPage + ' === ' + this.state.totalQuestions)
        if(this.state.currentPage === this.state.totalQuestions) {
            console.log('FINISHED')
        }
        else {
            this.setState({currentPage: this.state.currentPage + 1});
        }
    }

    // Handle page changing
    handlePaginate(pageNum) {
        this.setState({currentPage: pageNum});
    }

    render() {
        let component;

        // Survey is public -> populate the questions
        if(this.props.location.state.isOpen === true) {
            const res_data = this.props.surveyData;
            for(let i in res_data) {
                this.state.questions.push(res_data[i]);
                console.log("Question #" + i + res_data[i].question);
                this.state.totalQuestions = this.state.totalQuestions + 1;
            }

            // Pagination logic
            const indexOfLastQuestion = this.state.currentPage * this.state.postsPerPage;
            const indexOfFirstQuestion = indexOfLastQuestion - this.state.postsPerPage;
            const currentQuestion = this.state.questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
            console.log(currentQuestion);

            component = (
                <Grommet theme={theme}>
                    <Box pad="large">
                        <Heading level={3} alignSelf={"center"}>
                            {this.state.title}
                        </Heading>
                    </Box>
                    <Box fill justify="evenly" pad="xlarge">
                        <Form onSubmit={this.sendAndRedirect}>
                            {
                                <Box>
                                {currentQuestion.map((question) => 
                                    <FormField name="answer" key={question._id} label={question.question} required>
                                        <TextInput name="answer" type="text" onChange={this.handleAnswer(this.state.currentPage, question._id)} />
                                    </FormField>
                                )}
                                </Box>
                            }
                            {/* {<Pagination 
                                questionsPerPage={this.state.postsPerPage}
                                totalQuestions={this.state.questions.length}
                                >
                            </Pagination> } */}
                            <Box pad="medium">
                                
                                <Button margin="small" type="submit" label="Submit Answers"></Button>
                                <Divider></Divider>
                                <Button onClick={this.toDashboard} margin="small" label="Back to Surveys"></Button>
                            </Box>
                            </Form>
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

{/* {
                                this.state.questions.map((cur_question, i) => 
                                    <FormField name="answer" key={cur_question._id} label={cur_question.question} required>
                                        <TextInput name="answer" type="text" onChange={ console.log(this.state.answer)} />
                                    </FormField>
                                )
                            } 

                            <Form onSubmit={this.sendAndRedirect}>
                            {<userQuestions questions={currentQuestion} loading={this.state.loading}></userQuestions>}
                            { {<Pagination 
                                questionsPerPage={this.state.postsPerPage}
                                totalQuestions={this.state.questions.length}
                                >
                            </Pagination> } }
                            <Box pad="medium">
                                <Button margin="small" type="submit" label="Submit Answers"></Button>
                                <Divider></Divider>
                                <Button onClick={this.toDashboard} margin="small" label="Back to Surveys"></Button>
                            </Box>
                        </Form>
                        
                        
                        
                        
                        */}

export default connect(mapStateToProps, { getQuestions, postAnswer })(TakeSurvey);