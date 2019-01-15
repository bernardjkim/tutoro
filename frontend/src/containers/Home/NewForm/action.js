import {RECIEVE_PROFILE_ERROR} from './constant';

export const receiveProfileError=(err)=> ({
            type: RECIEVE_PROFILE_ERROR,
            payload: err.response.data
        })