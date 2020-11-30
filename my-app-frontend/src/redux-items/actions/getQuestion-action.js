import { QUESTIONS_SUCCESS, QUESTIONS_ERROR } from '../constants/types';

export function getQuestions(questionInfo) {
    console.log('-----> getQuestions: redux actions');
    let survey_questions = [];
    const survey = {
        title: questionInfo.title,
        id: questionInfo._id
    }
    console.log('Looking for: ');
    console.log(survey);

    return function(dispatch) {
        return fetch('http://localhost:5000/questions')
        .then(res => res.json())
        .then(all_questions => {
            for(let i in all_questions) {
                if(all_questions[i].survey_id == survey.id) {
                    survey_questions.push(all_questions[i]);
                }
            }
        })
        .then(console.log('Fetch is working in getQuestions (:'))
        .then(() => {
            return dispatch({
                type: QUESTIONS_SUCCESS,
                payload: survey_questions
            })
        })
        .catch((error) => {
            dispatch({type: QUESTIONS_ERROR});
        })
    }
};