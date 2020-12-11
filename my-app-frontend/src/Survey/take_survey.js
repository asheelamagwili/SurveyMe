import React from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../redux-items/actions/getQuestion-action';
import { Box, Grommet, Form, FormField, TextInput, Button, Heading } from 'grommet';
import { Divider } from '../Components/Divider';
import { Link } from 'react-router-dom';


function mapStateToProps(state) {
    return {
      surveyData: state.surveyData,
      displaySurveysSuccess: state.displaySurveysSuccess,
      loginSuccess: state.loginSuccess
    };
};

let cur_survey;

class TakeSurvey extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            title: '',
        }

        this.toDashboard = this.toDashboard.bind(this);
    }

    componentDidMount() {
        cur_survey = this.props.location.state;
        this.props.getQuestions(this.props.location.state)
        this.setState({
            questions: [],
            title: cur_survey.title,
        });
    }

    toDashboard() {
        this.props.history.push('/take');
    }

    render() {
        let component;

        // Check if the survey is public
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
                            {this.state.questions.map((cur_question) => 
                                <FormField name="answer" label={cur_question.question} required>
                                    <TextInput name="answer" type="text"/>
                                </FormField>
                            )}
                        </Form>
                        <Box pad="medium">
                            <Button margin="small" label="Submit Answers"></Button>
                        </Box>
                    </Box>
                </Grommet>
            )
    
        }
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

export default connect(mapStateToProps, { getQuestions })(TakeSurvey);