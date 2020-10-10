import React from 'react';
import { Bluetooth as Memory, Storage, Trigger } from 'grommet-icons';
import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Chart,
    Grid,
    Grommet,
    Text,
    FormField,
    TextInput,
    Button,
    Form
  } from 'grommet';

const surveyDashboard = () => {
    return (
        <div>
            <DisplayDashboard />
        </div>
    );
};

const getSurveys = () => {
    console.log('Inside getSurveys');

    fetch('http://localhost:5000/surveys')
    .then(response => console.log('Response: ' + response.body))
    .then(() => console.log('After fetch'))
}

// Frontend components to display data
const DisplayDashboard = () => {
    return (
        <Grommet theme={theme} full>
            <Box pad="large" background="dark-1" height="100%">
                <Form onSubmit={getSurveys}>
                    <FormField label="Search" name="search" required>
                        <TextInput name="search" type="search" />
                    </FormField>
                    <Button type="submit" label="Search"/>
                </Form>
                    
                <Grid gap="medium" columns={{ count: 'fit', size: 'small' }}>
                    {data.map(value => (
                        <Card key={value.title} onClick={() => {alert('Card was Clicked!');}}>
                            <CardBody pad="small">
                                <Identifier title={value.title} subTitle={value.subTitle} size="small">
                                    {value.icon}
                                </Identifier>
                                <ChartPreview type={value.type} />
                            </CardBody>

                            <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }}>
                                <Text size="xsmall">{value.message}</Text>
                            </CardFooter>
                        </Card>
                    ))}
                </Grid>
            </Box>
        </Grommet>
    )
};

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

export default surveyDashboard;