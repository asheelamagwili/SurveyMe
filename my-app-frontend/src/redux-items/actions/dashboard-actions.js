import { DISPLAY_SURVEYS_ERROR, DISPLAY_SURVEYS_SUCCESS } from "../constants/types";

export function getSurveys() {
    console.log('-----> getSurveys: redux actions');

    return function (dispatch) {
        return fetch('http://localhost:5000/surveys')
            .then(res => res.json())
            .then(json => {
                console.log('Testing item 4 in array: ' + json[4].title);
                return dispatch({
                    type: DISPLAY_SURVEYS_SUCCESS,
                    payload: json
                })
            })
            .catch((error) => {
                console.error("Error: ", error);
                dispatch({type: DISPLAY_SURVEYS_ERROR});
            })
    }
};