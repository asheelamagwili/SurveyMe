import { POST_ANSWER_SUCCESS, POST_ANSWER_ERROR } from '../constants/types';

export function postAnswer(answerInfo) {
    console.log('-----> REDUX: postAnswer()');

    const new_answer = {
        user_id: answerInfo.user_id,
        user_answer: answerInfo.user_answer,
        question_id: answerInfo.question_id
    };

    return function (dispatch) {
        return fetch('http://localhost:5000/questions/answer', {
            method: 'PUT',
            headers : {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(new_answer)
        })
        .then(res => res.json())
        .then(res => {
            return dispatch({
                type: POST_ANSWER_SUCCESS,
                payload: res
            })
        })
        .catch((error) => {
            return dispatch({
                type: POST_ANSWER_ERROR
            })
        });
    }

};