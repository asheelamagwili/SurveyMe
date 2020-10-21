import { DISPLAY_SURVEYS_ERROR, DISPLAY_SURVEYS_SUCCESS } from "../constants/types";

export function getSurveys() {
    console.log('Inside getSurveys');
    let data = [];

    /*
    fetch('http://localhost:5000/surveys')
        .then(res => res.json())
        .then(() => console.log('Fetch is working (:'))
        .then((res) => {
            //console.log('Dispatching ' + res[4].title);
            for(let i in res) {
                data.push(res[i]);
                console.log('Survey ' + i + ' - ' + data[i].title);
            }
        });
    */

    return function (dispatch) {
        fetch('http://localhost:5000/surveys', {
            method: 'GET',
            headers: {
                'Accept': "application/json",
            }
        })
            .then(res => res.json())
            .then(() => console.log('Fetch is working (:'))
            //.then((res) => console.log('After fetch test: ' + res[5].title))
            .then((res) => {
                //console.log('Dispatching ' + res[4].title);
                data.push('Test data')
                for(let i in res) {
                    data.push(res[i]);
                    console.log('Survey ' + i + ' - ' + data[i].title);
                }
                dispatch({type: DISPLAY_SURVEYS_SUCCESS, payload: data});
                    //.then((data) => {
                    //    for(let i in res) {
                    //        data.push(res[i]);
                    //        console.log('Survey ' + i + ' - ' + data[i].title);
                    //    }
                    //});
            })
            .catch((error) => {
                console.error("Error: ", error);
                dispatch({type: DISPLAY_SURVEYS_ERROR});
            })
    }
};