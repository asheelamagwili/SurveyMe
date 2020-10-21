import store from './store/store-index';
import { postRegister } from './actions/register-actions';
import { postLogin } from './actions/login-actions';
import { getSurveys } from './actions/dashboard-actions';

window.store = store;
window.postRegister = postRegister;
window.postLogin = postLogin;
window.getSurveys = getSurveys;