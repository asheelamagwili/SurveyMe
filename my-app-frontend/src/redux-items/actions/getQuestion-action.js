import { QUESTIONS_SUCCESS, QUESTIONS_ERROR } from '../constants/types';

export function getQuestions(questionInfo) {
    console.log('-----> getQuestions: redux actions');
    const survey = {
        title: questionInfo.title,
        id: questionInfo._id
    }
    console.log('Looking for: ');
    console.log(survey);

    return function(dispatch) {
        return fetch('http://localhost:5000/questions'/*, {
            method:'GET',
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify({
                title: survey.title,
                id: survey.id
            })
        }*/)
        .then(res => res.json())
        .then(console.log('Fetch is working in getQuestions (:'))
        .then(json => {
            console.log(json);
            return dispatch({
                type: QUESTIONS_SUCCESS,
                payload: json
            })
        }) //Send payload with the current survey
        .catch((error) => {
            dispatch({type: QUESTIONS_ERROR});
        })
    }
};