import { QUESTIONS_SUCCESS, QUESTIONS_ERROR } from '../constants/types';

export function getQuestions(questionInfo) {
    console.log('-----> getQuestions: redux actions');
    const survey = {
        title: questionInfo.title,
        id: questionInfo._id
    }

    return function(dispatch) {
        return fetch('http://localhost:5000/surveys/questions')
        .then(res => res.json())
        .then(console.log('Fetch is working in getQuestions (:'))
        .then(res => dispatch({
            type: QUESTIONS_SUCCESS,
            payload: survey
        })) //Send payload with the current survey
        .catch((error) => {
            dispatch({type: QUESTIONS_ERROR});
        })
    }
};