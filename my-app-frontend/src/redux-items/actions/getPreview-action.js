import { DISPLAY_PREVIEW_SUCCESS, DISPLAY_PREVIEW_ERROR } from '../constants/types';

export function getPreview(surveyInfo) {
    console.log('-----> getPreview: redux actions');
    let questions = [];

    return function(dispatch) {
        return fetch('http://localhost:5000/questions')
        .then(res => res.json())
        .then(all_questions => {
            for(let i in all_questions) {
                if(all_questions[i].survey_id == surveyInfo._id) {
                    questions.push(all_questions[i]);
                }
            }
        })
        .then(() => {
            return dispatch({
                type: DISPLAY_PREVIEW_SUCCESS,
                payload: questions
            })
        })
        .catch((error) => {
            dispatch({type: DISPLAY_PREVIEW_ERROR});
        })
    }
};