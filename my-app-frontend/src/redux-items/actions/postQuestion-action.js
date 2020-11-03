import { QUESTIONS_SUCCESS, QUESTIONS_ERROR } from '../constants/types';

// Handle backend API POST call to add a question to given survey
export function postQuestions(questionInfo) {

    const survey_to_edit = {
        survey_id: questionInfo.asurvey_id,
        question: questionInfo.question,
        answer: questionInfo.answer
    }
    console.log('Question to POST: ');
    console.log(survey_to_edit);

    return function (dispatch) {
        return fetch('http://localhost:5000/surveys/questions', {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify({
                survey_id: survey_to_edit.survey_id,
                question: survey_to_edit.question,
                answer: survey_to_edit.answer
            })
        })
        .then(res => res.json())
        .then(() => console.log('Fetch is working in postQuestions (:'))
        .then(test => console.log('Response: ' + test))
        .then(res => dispatch({
            type: QUESTIONS_SUCCESS,
            payload: res
        }))
        .catch((error) => {
            dispatch({type: QUESTIONS_ERROR});
        })
    }
};