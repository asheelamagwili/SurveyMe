import { CLOSE_SURVEY_SUCCESS, CLOSE_SURVEY_ERROR } from '../constants/types';

export function closeSurvey(surveyInfo) {
    console.log('---> openSurvey: redux actions')
    console.log(surveyInfo);

    const survey_to_update = {
        id: surveyInfo._id,
        action: 'close'
    }

    return function(dispatch){
        return fetch('http://localhost:5000/surveys', {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                id: survey_to_update.id,
                action: survey_to_update.action
            })
        })
        .then(res => res.json)
        .then(() => {
            return dispatch({ type: CLOSE_SURVEY_SUCCESS})
        })
        .catch((error) => {
            dispatch({type: CLOSE_SURVEY_ERROR})
        })
    }
};