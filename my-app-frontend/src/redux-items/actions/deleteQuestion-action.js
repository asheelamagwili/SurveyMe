import { DELETE_QUESTION_SUCCESS, DELETE_QUESTION_ERROR } from '../constants/types';

export function deleteQuestion(questionInfo) {
    const question_to_delete = {
        id: questionInfo._id
    }

    return function(dispatch){
        return fetch('http://localhost:5000/questions', {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                id: question_to_delete.id
            })
        })
        .then(res => res.json())
        .then(() => {
            return dispatch({type: DELETE_QUESTION_SUCCESS});
        })
        .catch((error) => {
            dispatch({type: DELETE_QUESTION_ERROR});
        })
    }
}