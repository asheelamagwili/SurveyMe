import { POST_ANSWER_SUCCESS, POST_ANSWER_ERROR } from '../constants/types';

export function postAnswer(new_answers) {
    console.log('-----> REDUX: postAnswer()');
    console.log(new_answers);

    return function (dispatch) {
        return fetch('http://localhost:5000/questions/answer', {
            method: 'PUT',
            headers : {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({new_answers})
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