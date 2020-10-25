import { QUESTIONS_SUCCESS, QUESTIONS_ERROR } from '../constants/types';

// Handle backend API POST call to add a question to given survey
export function postQuestions(questionInfo) {

    const survey_to_edit = {
        survey_id: questionInfo.survey_id,
        question: questionInfo.question,
        Answers: questionInfo.Answers
    }

    return function (dispatch) {
        fetch('http://localhost:5000/surveys/questions', {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': "*"
            },
            body: JSON.stringify({
                survey_id: survey_to_edit.survey_id,
                question: survey_to_edit.question,
                Answers: survey_to_edit.Answers
            })
        })
        .then(res => res.json())
        .then(() => console.log('Fetch is working (:'))
        .then(test => console.log('Response: ' + test))
        .then(dispatch({type: QUESTIONS_SUCCESS}))
        .catch((error) => {
            dispatch({type: QUESTIONS_ERROR});
        })
    }
};