import { QUESTIONS_SUCCESS, QUESTIONS_ERROR } from '../constants/types';

export function getQuestions(questionInfo) {
    console.log('Inside getQuestion action');
    const survey = {
        title: questionInfo.title,
        id: questionInfo.id
    }
    console.log(survey);
    
    return function(dispatch) {
        fetch('http://localhost:5000/surveys/questions')
        .then(res => res.json())
        .then(console.log('Fetch is working in getQuestions (:'))
        .then(() => dispatch({
            type: QUESTIONS_SUCCESS
        })) //Send payload with the current survey
        .catch((error) => {
            dispatch({type: QUESTIONS_ERROR});
        })
    }
};