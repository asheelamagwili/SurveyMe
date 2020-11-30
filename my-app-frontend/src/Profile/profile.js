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
            username: '',
            login_state: ''
        }
    }

    

    render() {
        let component;
        const user = this.props.userData;
        const login_val = localStorage.getItem('login_state');

        console.log('Login state in profile: ' + login_val);

        // If the user is logged in then display their profile information
        //if(this.props.loginSuccess === true) {
        if(login_val == 'true') {
            const name_val = localStorage.getItem('name');
            component = (
                <div>
                    <h1>{name_val}</h1>
                </div>
            )
        }
        else
            component = (
                <div>
                    <h1>Login to see your Profile!</h1>
                </div>
            )

        return component;
    }
};

export default connect(mapStateToProps)(Profile);