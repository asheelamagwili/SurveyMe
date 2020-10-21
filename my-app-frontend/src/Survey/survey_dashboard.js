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

let data = [];

function mapStateToProps(state) {
  return {
    displaySurveysSuccess: state.displaySurveysSuccess,
  };
}
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

// Frontend components to display data
const surveyDashboard = ({...props}) => {
    //data.push('hello!')

    data = props.getSurveys();
    //console.log('first thing in array: ' + data[0]);
    /*for(let i in res) {
      console.log('Survey ' + i + ' - ' + res[i].title);
    }*/

    return (
      <Form>
        <Button type="submit"></Button>
      </Form>
    )
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

export default connect(mapStateToProps, { getSurveys })(surveyDashboard);