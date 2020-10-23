import React from 'react';
import { getSurveys } from '../redux-items/actions/dashboard-actions';
import { connect } from 'react-redux';
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

//let surveys = [];

function mapStateToProps(state) {
  return {
    surveyData: state.surveyData,
    displaySurveysSuccess: state.displaySurveysSuccess
  };
};

/*
const getSurveys = (data) => {
    console.log('Inside getSurveys');

    fetch('http://localhost:5000/surveys')
    .then(res => res.json())
    //.then(res => console.log('Response: ' + res[2].title))
    .then(res => {
      console.log('Title: ' + res[5].title)
      for (let element in res) {
        console.log('Survey title: ' + res[element].title)
        data.push(res[element]);
      }

    })
    .then(() => console.log('After fetch'))
    .then(res => {
      for(let i in data) {
        console.log('Survey ' + i + ' - ' + data[i].title);
      }
    })
}
*/

let surveys;
// Frontend components to display data
//const SurveyDashboard = ({...props}) => {

  //const [surveys, setSurveys] = React.useState([]);

  /*React.useEffect(async () => {
      console.log('-----> useEffect: front end')
    //this.props.getSurveys();
    setSurveys(props.getSurveys());
    await props.getSurveys()
    surveys.push({title:'Sample Survey'});
    console.log('First survey title: ' + surveys[0].title);
    console.log('Actual survey title: ' + props.surveyData);
    console.log('Survey Success test: ' + props.displaySurveysSuccess);

    if(props.displaySurveysSuccess === true) {
      console.log('Objects received!')
    }
  }, []);*/

  /*return (
    //const surveys = this.props.surveyData//.map(survey => {
      <Button value="hello" />
    //})
  )*/

class SurveyDashboard extends React.Component {

    constructor(props) {
      super(props);
      //this.state = {surveyData: this.props.surveyData}
    }

    componentDidMount() {
      console.log('-----> componentDidMount: front end')
      //console.log(this.props.getSurveys()); // Shows that promise is fulfilled and objects are being sent
      this.props.getSurveys();
      //this.setState({displaySurveysSuccess: true});
      console.log( this.props.surveyData ); // Returns undefined & cant access the objects by this.props.surveyData
      console.log()
    }

    //props.getSurveys();
    /*for(let i in this.props.surveyData) {
      console.log('Survey ' + i + ' - ' + res[i].title);
    }*/

    render () {
      let component;
      let surveys = [];

      const surveysProp = this.props.surveyData;
      for(let i in surveysProp) {
        surveys.push(surveysProp[i]);
        console.log('Survey ' + i + ' - ' + surveys[i].title);
      }

      if(this.props.surveyData === null || this.props.surveyData === undefined) {
        component = 'Data is null :(';
      }
      else {
        component = surveyCard(this.props.surveyData)
      }

      /*this.props.surveyData.map((survey) => {
        <Button value={survey.title} />
      })*/
      console.log('Render lifecycle');
      return component;
    }
};

const surveyCard = (surveys) => (
  <Grommet theme={theme} full>
    <Box alignSelf="center" pad="medium">
      <Heading level={2} size="large">
        Surveys
      </Heading>

      <Grid gap="medium" rows="small" columns={{count: 'fit', size: 'small'}}>
          {surveys.map((survey) =>
            <Card
              key={survey.title}
              onClick={() => {
                alert('Card was Clicked!');
              }}
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
      extend: `color: #233C33`
    }
};

export default connect(mapStateToProps, { getSurveys })(SurveyDashboard);