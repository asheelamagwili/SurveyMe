import store from './store/store-index';
import { postRegister } from './actions/register-actions';
import { postLogin } from './actions/login-actions';

window.store = store;
window.postRegister = postRegister;
window.postLogin = postLogin;