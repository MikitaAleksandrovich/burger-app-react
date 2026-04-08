import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
};

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store token upon login', () => {
        expect(reducer(initialState, { 
            type: actionTypes.AUTH_SUCCESS,     
            token: 'some-token',
            userId: 'some-userId', 
        })).toEqual({
            ...initialState,
            token: 'some-token',
            userId: 'some-userId',
        });
    });

    it('should set the auth redirect path', () => {
        expect(reducer(initialState, {
            type: actionTypes.SET_AUTH_REDIRECT_PATH,
            path: '/orders',
        })).toEqual({
            ...initialState,
            authRedirectPath: '/orders',
        });
    });
});