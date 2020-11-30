import React from 'react';
import { getSurveys } from '../redux-items/actions/dashboard-actions';
import { getQuestions } from '../redux-items/actions/getQuestion-action';
import { connect } from 'react-redux';
import {Divider} from '../Components/Divider';
import {
    Box,
    Text,
    Button,
    Chart,
    Form,
    Grommet,
    Grid,
    Card,
    CardBody,
    CardFooter,
    Heading
} from 'grommet';

function mapStateToProps(state) {
  return {
    surveyData: state.surveyData,
    displaySurveysSuccess: state.displaySurveysSuccess,
    loginSuccess: state.loginSuccess
  };
};

let surveys;

class SurveyDashboard extends React.Component {

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.props.getSurveys();

      console.log(this.props.loginSuccess);
    }

    sendAndRedirect(value){
      //console.log('Survey Title: ' + value.title);
      // Send the current survey clicked to the questions page
      //this.props.getQuestions(value);
      this.props.history.push({
        pathname: '/questions',
        state: value
      });
    }

    render () {
      let component;
      let surveys = [];

      const surveysProp = this.props.surveyData;
      for(let i in surveysProp) {
        surveys.push(surveysProp[i]);
      }

      if(this.props.surveyData === null || this.props.surveyData === undefined) {
        component = 'Data is null :(';
      }
      else {
        //component = surveyCard(this.props.surveyData)
        component = (
          <Grommet theme={theme} full>
            <Box alignSelf="center" pad="medium">
              <Heading level={2} size="large" alignSelf="center">
                Surveys
              </Heading>
              <Divider/>
              <Grid gap="medium" rows="small" columns={{count: 'fit', size: 'small'}}>
                  {surveys.map((survey) =>
                    <Card
                      key={survey.title}
                      onClick={() => this.sendAndRedirect(survey)}
                    >
                        <CardBody pad="small">
                          <Identifier
                            pad="small"
                            title={survey.title}
                            subTitle={survey.description}
                            size="small"
                            align="start"
                          />
                        </CardBody>
        
                        <CardFooter pad={{horizontal: 'medium', vertical: 'small'}}/>
                    </Card>
                  )}
              </Grid>
            </Box>
          </Grommet>
        )
      }

      //console.log('Render lifecycle');
      return component;
    }
};

const Identifier = ({ children, title, subTitle, size, ...rest }) => (
    <Box gap="small" align="center" direction="row" pad="medium" {...rest}>
      {children}
      <Box>
        <Text size={size} weight="bold">
          {title}
        </Text>
        <Text size={size}>{subTitle}</Text>
      </Box>
    </Box>
);

const theme = {
    themeMode: 'light',
    global: {
      font: {
        family: 'Lora'
      },
    },
    card: {
      container: {
        background: '#DADFF7',
        elevation: 'none',
      },
      footer: {
        pad: { horizontal: 'medium', vertical: 'small' },
        background: '#B5B2C2',
      },
    },
    heading: {
      extend: `color: #233C33`,
      margin: "small",
    }
};

export default connect(mapStateToProps, { getSurveys, getQuestions })(SurveyDashboard);