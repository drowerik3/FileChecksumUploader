import { SEND_CHECKSUM } from '../actions/index';

const INITIAL_STATE = {checksumObj: null};


export default function sendChecksumReducer(state=INITIAL_STATE, action) {
    switch(action.type){
        case SEND_CHECKSUM:
            return { ...state, checksumObj:action.payload.data};
        default:
            return state;
    }

}