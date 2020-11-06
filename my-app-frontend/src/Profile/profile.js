import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
      loginSuccess: state.loginSuccess
    };
};

//const Profile = () => {
class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    componentDidMount() {

        console.log(this.props.loginSuccess);
        // If the user is logged in then display their profile information
        if(this.props.loginSuccess == true) {
            this.state.username = 'Youre logged in!';
        }
        else
            this.state.username = 'Youre not logged in!';
    }

    render() {
        let component;

        component = (
            <div>
                <h1>{this.state.username}</h1>
            </div>
        )

        return component;
    }
};

export default connect(mapStateToProps)(Profile);