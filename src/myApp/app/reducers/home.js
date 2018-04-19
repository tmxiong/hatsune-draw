
import * as types from '../actionTypes';

export function setMineIcon(url) {
    return dispatch => {
        dispatch(setIcon(url))
    }
}

function setIcon(url) {
    return{
        type: types.SET_OPEN_CODE,
        icon: url,
    }
}
