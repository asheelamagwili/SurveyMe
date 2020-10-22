import React from 'react';
import { getSurveys } from '../redux-items/actions/dashboard-actions';
import { connect } from 'react-redux';
import {
    Box,
    Text,
    Button,
    Chart,
    Form
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
        component = surveys.map((survey) =>
          <Button label={survey.title} />
        );
      }

      /*this.props.surveyData.map((survey) => {
        <Button value={survey.title} />
      })*/
      console.log('Render lifecycle');
      return component;
    }
};

/*
const data = [
    {
      icon: <Memory size="large" />,
      title: 'Memory (EEC)',
      subTitle: '8 GB @ 400Hz',
      message: 'Past 24hrs',
      type: 'bar',
    },
    {
      icon: <Storage size="large" />,
      title: 'Storage',
      subTitle: 'Sub-system and Devices',
      message: '36.8 TB available',
      type: 'line',
    },
    {
      icon: <Trigger size="large" />,
      title: 'Power (Watts)',
      subTitle: '720 Watt Service',
      message: 'Past 12hrs',
      type: 'point',
    },
];
*/

const Identifier = ({ children, title, subTitle, size, ...rest }) => (
    <Box gap="small" align="center" direction="row" pad="small" {...rest}>
      {children}
      <Box>
        <Text size={size} weight="bold">
          {title}
        </Text>
        <Text size={size}>{subTitle}</Text>
      </Box>
    </Box>
);

const gradient = [
    { value: 28, color: 'status-ok' },
    { value: 50, color: 'status-warning' },
    { value: 80, color: 'status-critical' },
  ];

const theme = {
    themeMode: 'dark',
    global: {
      font: {
        family: `-apple-system,
             BlinkMacSystemFont, 
             "Segoe UI"`,
      },
    },
    card: {
      container: {
        background: '#FFFFFF12',
        elevation: 'none',
      },
      footer: {
        pad: { horizontal: 'medium', vertical: 'small' },
        background: '#FFFFFF06',
      },
    },
};

const ChartPreview = ({ type }) => (
    <Box>
      <Chart
        type={type}
        id={type}
        dash={type === 'line'}
        round
        thickness="xsmall"
        bounds={[
          [0, 6],
          [0, 100],
        ]}
        values={[
          { value: [6, 100], label: 'one hundred' },
          { value: [5, 70], label: 'seventy' },
          { value: [4, 40], label: 'sixty' },
          { value: [3, 80], label: 'eighty' },
          { value: [2, 25], label: 'forty' },
          { value: [1, 50], label: 'thirty' },
          { value: [0, 25], label: 'sixty' },
        ]}
        aria-label="chart card"
        color={gradient}
        size={{ height: 'xsmall' }}
      />
    </Box>
);

export default connect(mapStateToProps, { getSurveys })(SurveyDashboard);