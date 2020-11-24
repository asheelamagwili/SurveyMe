import React from 'react';
import { grommet } from 'grommet/themes';
import { connect } from 'react-redux';
import { postNewSurvey } from '../redux-items/actions/createSurvey-action';
import { 
    Box, 
    Button, 
    TextInput, 
    DateInput, 
    Form, 
    FormField, 
    Grommet,
    Heading
} from 'grommet';

function mapStateToProps(state) {
    return {
        createSurveySuccess: state.createSurveySuccess,
        loginSuccess: state.loginSuccess,
        userData: state.userData
    };
}

//const Create = ({...props}) => {
class Create extends React.Component {
    /*const [value, setValue] = React.useState ({
        title: "",
        description: "",
        isOpen: "",
        authorID: "", // Need at add authorID when a new survey is created so that we know who needs to have admin rights
        startDate: "",
        endDate: ""
    });*/

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            isOpen: '',
            authorID: '',
            startDate: '',
            endDate: ''
        };

        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
    }

    sendAndRedirect() {
        this.props.postNewSurvey({
            title: this.state.title,
            description: this.state.description,
            isOpen: false,
            authorID: 'autho id huhuhuh',
            startDate: this.state.startDate,
            endDate: this.state.endDate
        });
        this.props.history.push('/surveys/create/questions');
        console.log('ID of user who created the survey: ')
        console.log(this.props.state.userData);
    }

    // Form handlers
    handleTitle(event) {
        this.setState({title: event.target.value});
        //event.preventDefault();
    }

    handleDescription(event) {
        this.setState({description: event.target.value});
        //event.preventDefault();
    }

    handleStart(event) {
        this.setState({startDate: event.target.value});
        //event.preventDefault();
    }

    handleEnd(event) {
        this.setState({endDate: event.target.value});
        //event.preventDefault();
    }

    render() {
        return (
            <Grommet theme={theme}>
                <Box fill align="center" justify="center">
                    <Heading level={2} size="large">
                        Create a Survey
                    </Heading>

                    <Box width="medium">
                        <Form value={this.state.value} onSubmit={() => this.sendAndRedirect(this.state.value)}>
                            <FormField label="Survey Title" name="title" required>
                                <TextInput name="title" type="text" value={this.state.title} onChange={this.handleTitle} />
                            </FormField>

                            <FormField label="Description" name="description" required>
                                <TextInput name="description" type="text" value={this.state.description} onChange={this.handleDescription}/>
                            </FormField>

                            <FormField name="startDate" label="Start Date" required>
                                <DateInput name="startDate" format="mm/dd/yyyy" value={this.state.startDate} onChange={() => console.log(this.state.startDate)}/>
                            </FormField>

                            <FormField name="endDate" label="End Date" required>
                                <DateInput name="endDate" format="mm/dd/yyyy" value={this.state.endDate} onChange={() => this.handleEnd}/>
                            </FormField>
                            <Button label="Create" type="submit"/>
                        </Form>
                    </Box>
                </Box>
            </Grommet>
        )
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

export default connect(mapStateToProps, { postNewSurvey })(Create);