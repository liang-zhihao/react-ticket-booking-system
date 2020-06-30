
import {
    combineReducers,
} from 'redux';
import {userReducer} from './user';
// import {xxx} mean that need to export like this: export XXX ,import xxx from means that export default xxx 
const rootReducers = combineReducers({ 
  user:userReducer,

});

export default rootReducers;