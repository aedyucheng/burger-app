import * as actions from '../actions/actionTypes';
import { updateObject } from '../Utility';

const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actions.AUTH_START: return authStart(state, action);
        case actions.AUTH_SUCCESS: return authSuccess(state, action);
        case actions.AUTH_FAIL: return authFail(state, action);
        case actions.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false,
    });
}

const authFail = (state, action) => {
    return updateObject(state, { 
        error: action.error,
        loading: false 
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    })
}

export default reducer;

