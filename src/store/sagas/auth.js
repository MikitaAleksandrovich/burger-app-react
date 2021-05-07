import { put, delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucced());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
};

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    };
    let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCB3cyFnp1gbWUhlls3_4c-zj-LSwU3av8';
    if(!action.isSignup) {
        authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCB3cyFnp1gbWUhlls3_4c-zj-LSwU3av8';
    }
    try {
        const response = yield axios.post(authUrl, authData);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
};

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    const userId = yield localStorage.getItem('userId');
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if(!token) {
        yield put(actions.logout());
    } else {
        if(expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        };
    };
};
