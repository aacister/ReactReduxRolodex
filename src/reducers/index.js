import {combineReducers} from 'redux';
import contacts from './contactReducer';
import hobbies from './hobbyReducer';

const rootReducer = combineReducers({
  contacts,
  hobbies
})

export default rootReducer;
