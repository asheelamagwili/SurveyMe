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
        this.handlePassword = this.handlePassword.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
    }

    sendAndRedirect() {
        this.props.postNewSurvey({
            title: this.state.title,
            description: this.state.description,
            isOpen: false,
            //authorID: this.props.userData._id,
            authorID: 'meeep',
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            password: this.state.password
        });
        this.props.history.push('/surveys/create/questions');
    }

    // Form handlers
    handleTitle(event) {
        this.setState({title: event.target.value});
    }

    handleDescription(event) {
        this.setState({description: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handleStart(event) {
        this.setState({startDate: event.value});
    }

    handleEnd(event) {
        this.setState({endDate: event.value});
    }

    render() {

        //console.log('User Data: ');
        //console.log(this.props.userData._id);
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

                            <FormField label="Password" name="password" required>
                                <TextInput name="password" type="text" value={this.state.password} onChange={this.handlePassword}/>
                            </FormField>

                            <FormField name="startDate" label="Start Date" required>
                                <DateInput name="startDate" format="mm/dd/yyyy" value={this.state.startDate} onChange={this.handleStart}/>
                            </FormField>

                            <FormField name="endDate" label="End Date" required>
                                <DateInput name="endDate" format="mm/dd/yyyy" value={this.state.endDate} onChange={this.handleEnd}/>
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