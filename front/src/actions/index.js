import axios from 'axios';

export const SEND_CHECKSUM = 'SEND_CHECKSUM';

export const ROOT_URL = 'http://127.0.0.1:5000';

export function sendChecksum(sha256Checksum){
    const request = axios.post(
        `${ROOT_URL}/api/file_checksum/`,
        {"checksum": sha256Checksum}
        );

    return {
        type: SEND_CHECKSUM,
        payload: request
    }
}
