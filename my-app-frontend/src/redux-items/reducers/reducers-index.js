import { REGISTER_SUCCESS } from '../constants/types';
import { REGISTER_ERROR } from '../constants/types';
import { LOGIN_SUCCESS } from '../constants/types';
import { LOGIN_ERROR } from '../constants/types';
import { DISPLAY_SURVEYS_SUCCESS } from '../constants/types';
import { DISPLAY_SURVEYS_ERROR } from '../constants/types';
import { QUESTIONS_SUCCESS } from '../constants/types';
import { QUESTIONS_ERROR } from '../constants/types';
import { CREATE_SURVEY_SUCCESS } from '../constants/types';
import { CREATE_SURVEY_ERROR } from '../constants/types';
import { DISPLAY_PREVIEW_SUCCESS } from '../constants/types';
import { DISPLAY_PREVIEW_ERROR } from '../constants/types';
import { OPEN_SURVEY_ERROR, OPEN_SURVEY_SUCCESS } from '../constants/types';
import { POST_ANSWER_SUCCESS, POST_ANSWER_ERROR } from '../constants/types';

const initialState = {
    postAnswerSuccess : false,
    postAnswerError : false,
    openSurveySuccess : false,
    openSurveyError : false,
    displayPreviewSuccess : false,
    displayPreviewError : false,
    questionsSuccess : false,
    questionsError : false,
    displaySurveysSuccess : false,
    displaySurveysError : false,
    createSurveySuccess: false,
    createSurveyError: false,
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
            userData : action.payload
        }
    }

    if(action.type === LOGIN_ERROR){
        return {
            ...state, 
            loginSuccess : false,
            loginError : true,
            userData: action.payload
        }
    }

    // Survey
    if(action.type === CREATE_SURVEY_SUCCESS){
        return {
            ...state, 
            createSurveySuccess : true,
            createSurveyError : false,
        }
    }

    if(action.type === CREATE_SURVEY_ERROR){
        return {
            ...state, 
            createSurveySuccess : false,
            createSurveyError : true,
        }
    }

    if(action.type === DISPLAY_SURVEYS_SUCCESS){
        return {
            ...state, 
            displaySurveysSuccess : true,
            displaySurveysError : false,
            surveyData: action.payload
        }
    }

    if(action.type === DISPLAY_SURVEYS_ERROR){
        return {
            ...state, 
            displaySurveysSuccess : false,
            displaySurveysError : true,
            surveyData: action.payload
        }
    }

    if(action.type === QUESTIONS_SUCCESS){
        return {
            ...state, 
            questionsSuccess : true,
            questionsError : false,
            surveyData: action.payload,
        }
    }

    if(action.type === QUESTIONS_ERROR){
        return {
            ...state, 
            questionsSuccess : false,
            questionsError : true,
            surveyData: action.payload,
        }
    }

    if(action.type === DISPLAY_PREVIEW_SUCCESS) {
        return {
            ...state,
            displayPreviewSuccess : true,
            displayPreviewError : false,
            surveyData: action.payload
        }
    }

    if(action.type === DISPLAY_PREVIEW_ERROR) {
        return {
            ...state,
            displayPreviewSuccess : false,
            displayPreviewError : true,
            surveyData: action.payload
        }
    }

    if(action.type === OPEN_SURVEY_SUCCESS) {
        return {
            ...state,
            openSurveySuccess : true,
            openSurveyError : false
        }
    }

    if(action.type === OPEN_SURVEY_ERROR) {
        return {
            ...state,
            openSurveySuccess : false,
            openSurveyError : true
        }
    }

    // Answer
    if(action.type === POST_ANSWER_SUCCESS) {
        return {
            ...state,
            postAnswerSuccess : true,
            postAnswerError : false,
            answerData : action.payload
        }
    }

    if(action.type === POST_ANSWER_ERROR) {
        return {
            ...state,
            postAnswerSuccess : false,
            postAnswerError : true,
            answerData : action.payload
        }
    }


    return state;
};

export default rootReducer;