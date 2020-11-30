import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
      loginSuccess: state.loginSuccess,
      userData: state.userData
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

    render() {
        let component;
        const user = this.props.userData;
        localStorage.setItem('login_state', this.props.loginSuccess)

        // If the user is logged in then display their profile information
        if(this.props.loginSuccess === true) {
            this.state.username = user.name
        }
        else
            this.state.username = 'Youre not logged in!';

        component = (
            <div>
                <h1>{this.state.username}</h1>
            </div>
        )

        return component;
    }
};

export default connect(mapStateToProps)(Profile);