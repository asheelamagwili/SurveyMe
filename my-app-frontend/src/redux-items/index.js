import store from './store/store-index';
import { postRegister } from './actions/register-actions';
import { postLogin } from './actions/login-actions';
import { getSurveys } from './actions/dashboard-actions';
import { postQuestions } from './actions/postQuestion-action';
import { getQuestions } from './actions/getQuestion-action';
import { postNewSurvey } from './actions/createSurvey-action';

window.store = store;
window.postRegister = postRegister;
window.postLogin = postLogin;
window.getSurveys = getSurveys;
window.postQuestions = postQuestions;
window.getQuestions = getQuestions;
window.postNewSurvey = postNewSurvey;