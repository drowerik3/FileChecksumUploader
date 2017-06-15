import { combineReducers } from 'redux';
import sendChecksumReducer from './send_checksum';


const rootReducer = combineReducers({
    fileChecksum: sendChecksumReducer
});

export default rootReducer;
