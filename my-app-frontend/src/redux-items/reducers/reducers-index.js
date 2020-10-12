import {REGISTER_SUCCESS} from '../constants/action-types';
import {REGISTER_ERROR} from '../constants/action-types';

const initialState = {
    registerSuccess : false,
    registerError : false
};

function rootReducer(state = initialState, action) {
    //console.log('Action type:' + action.type);
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
    return state;
};

export default rootReducer;