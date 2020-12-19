import { CREATE_SURVEY_SUCCESS, CREATE_SURVEY_ERROR } from '../constants/types';


export function postNewSurvey(surveyInfo){
    console.log('Inside postNewSurvey');

    const survey = {
        title: surveyInfo.title,
        description: surveyInfo.description,
        survey_pass: surveyInfo.password,
        isOpen: false,
        authorID: surveyInfo.authorID,
        startDate: surveyInfo.startDate,
        endDate: surveyInfo.endDate
    }

    console.log('After creating new survey: ' + survey.title);

    if(typeof survey !== 'undefined' && survey !== null) {

        return function (dispatch) {
            fetch('http://localhost:5000/surveys/new', {
                method: 'POST',
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json",
                    'Access-Control-Allow-Origin': "*"
                },
                body: JSON.stringify({
                    title: survey.title,
                    description: survey.description,
                    survey_pass: survey.survey_pass,
                    isOpen: false,
                    authorID: survey.authorID,
                    startDate: survey.startDate,
                    endDate: survey.endDate
                }),
            })
            .then(res => res.json())
            .then(() => console.log('Fetch is working :)'))
            .then(json => {
                dispatch({ 
                    type: CREATE_SURVEY_SUCCESS
                });
            })
            .catch((error) => {
                console.error("Error: ", error);
                dispatch({ type: CREATE_SURVEY_ERROR });
            })
        }
    }
    else {
        console.log('User was null or undefined');
    }
};