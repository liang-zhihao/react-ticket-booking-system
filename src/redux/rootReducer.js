
import {
    combineReducers,
} from 'redux';
import {registerReducer} from './register';
// import {xxx} mean that need to export like this: export XXX ,import xxx from means that export default xxx 
const rootReducers = combineReducers({ 
    registerReducer,

});

export default rootReducers;