import React from 'react';
import { connect } from 'react-redux';
import { getSurveys } from '../redux-items/actions/dashboard-actions';
import {Divider} from '../Components/Divider';
import { 
    Grommet,
    Box,
    Heading,
    Grid,
    Card,
    CardBody,
    CardFooter,
    Text
} from 'grommet';

function mapStateToProps(state) {
    return {
        surveyData: state.surveyData,
        surveySuccess: state.surveySuccess,
    };
}

let cur_survey;

class SurveyView extends React.Component {

    constructor(props) {
        super(props);

        this.sendAndRedirect = this.sendAndRedirect.bind(this);
    }

    componentDidMount() {
        this.props.getSurveys();
        console.log(this.props.loginSuccess);
    }

    sendAndRedirect(value) {
        console.log("Send values to DB & redirect to questions page");
        this.props.history.push({
            pathname: '/take/survey',
            state: value
        });
    }

    render () {
        console.log(this.props.location.state);

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
            component = (
                <Grommet theme={theme} full>
                <Box alignSelf="center" pad="medium">
                    <Heading level={2} size="large" alignSelf="center">
                    Take a Survey
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

        return component;
    }
}

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
        background: '#A0C1D1',
        elevation: 'none',
      },
      footer: {
        pad: { horizontal: 'medium', vertical: 'small' },
        background: '#4F646F',
      },
    },
    heading: {
      extend: `color: #233C33`,
      margin: "small",
    }
};

export default connect(mapStateToProps, { getSurveys })(SurveyView);