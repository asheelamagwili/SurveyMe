import { REGISTER_SUCCESS } from '../constants/types';
import { REGISTER_ERROR } from '../constants/types';
import { LOGIN_SUCCESS } from '../constants/types';
import { LOGIN_ERROR } from '../constants/types';


const initialState = {
    displayQuestionSuccess : false,
    displayQuestionError : false,
    registerSuccess : false,
    registerError : false,
    loginSuccess : false,
    loginError : false,
};

function rootReducer(state = initialState, action) {
    // Register new user reducers
    if(action.type === REGISTER_SUCCESS){
        return {
            ...state, 
            registerSuccess: true,
            registerError: false,
        }
    }

    if(action.type === REGISTER_ERROR){
        return {
            ...state, 
            registerSuccess: false,
            registerError: true,
        }
    }

    // Login existing user reducers
    if(action.type === LOGIN_SUCCESS){
        return {
            ...state, 
            loginSuccess : true,
            loginError : false,
        }
    }

    if(action.type === LOGIN_ERROR){
        return {
            ...state, 
            loginSuccess : false,
            loginError : true,
        }
    }

    // Survey

    return state;
};

export default rootReducer;