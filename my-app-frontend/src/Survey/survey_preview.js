import React from 'react';
import { Box, Grommet, Form, FormField, TextInput, Button, Heading } from 'grommet';
import { connect } from 'react-redux';
import { getPreview } from '../redux-items/actions/getPreview-action';
import { openSurvey } from '../redux-items/actions/openSurvey-action';
import { closeSurvey } from '../redux-items/actions/closeSurvey-action';
import { Divider } from '../Components/Divider';

let component;
let cur_survey;

function mapStateToProps(state) {
    return {
        surveyData: state.surveyData,
        previewSuccess: state.previewSuccess,
        openSurveySuccess: state.openSurveySuccess
    };
}

class Preview extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            title: '',
            surveyStatus: ''
        }

        this.openSurvey = this.openSurvey.bind(this);
    }

    componentDidMount(){
        console.log('-----> componentDidMount() in survey_preview')
        cur_survey = this.props.location.state;
        this.props.getPreview(this.props.location.state);
        this.setState({
            questions: [],
            title: cur_survey.title
        });
    }

    openSurvey() {
        console.log('NEED TO LAUNCH THE SURVEY!: set the state of survey to open')
        // Set the state of survey to open
        this.props.openSurvey(cur_survey);
        // Redirect to dashboard
        this.props.history.push({
            pathname: '/surveys'
        });
    }

    closeSurvey(){
        this.state.surveyStatus = 'close';
        this.props.closeSurvey(cur_survey);
    }

    render () {

        // Make sure the survey questions was retrieved from the redux actions' fetch call
        if(this.state.questions === null || this.state.questions === undefined) {
            this.state.questions = [];
            this.props.getPreview(this.props.location.state);
            const res_data = this.props.surveyData;
            for(let i in res_data) {
                this.state.questions.push(res_data[i]);
            }
        }
        else {
            this.state.questions = [];
            const res_data = this.props.surveyData;
            for(let i in res_data) {
                this.state.questions.push(res_data[i]);
            }
        }

        component = (
            <Grommet theme={theme}>
                <Box pad="large">
                    <Heading level={3}>
                        {this.state.title} - Preview
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
                        <Divider/>
                        <Button margin="medium" label="Publish Survey" type="submit" onClick={this.openSurvey}></Button>
                    </Box>
                </Box>
            </Grommet>
        )

        return component;
    }
}

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

export default connect(mapStateToProps, { getPreview, openSurvey, closeSurvey })(Preview);