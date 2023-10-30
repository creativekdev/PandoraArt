import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import jwtService from 'app/services/jwtService';
import { setUserData } from './userSlice';
import api from 'utils/api';
import i18n from 'i18next';

export const submitLogin = ({ email, password }) => async (dispatch) => {
    return jwtService
        .signInWithEmailAndPassword({email, password})
        .then((user) => {
            dispatch(setUserData(user));

            return dispatch(loginSuccess());
        })
        .catch((error) => {
            // return dispatch(loginError(errors));
            dispatch(
                showMessage({
                    message: error.message,
                    autoHideDuration: 2000,
                    anchorOrigin: {
                        vertical  : 'top',
                        horizontal: 'center'
                    },
                    variant: 'error'
                })
            );
        });
};

export const sendMail = createAsyncThunk('/user/email', async ({ email }, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post('/user/email', { email });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const setNewPassword = createAsyncThunk('/user/password/reset', async (data, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post('/user/password/reset', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const loginWithGoogle = (data) => async (dispatch) => {
    return jwtService
        .signInWithGoogle(data)
        .then((user) => {
            dispatch(setUserData(user));

            return dispatch(loginSuccess());
        })
        .catch((error) => {
            dispatch(
                showMessage({
                    message: error.message,
                    autoHideDuration: 2000,
                    anchorOrigin: {
                        vertical  : 'top',
                        horizontal: 'center'
                    },
                    variant: 'error'
                })
            );
        });
};

const initialState = {
    success: false,
    errors: [],
    isMailSending: false,
    mailResult: {},
    setPasswordResult: {}
};

const loginSlice = createSlice({
    name: 'auth/login',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.success = true;
            state.errors = [];
        },
        loginError: (state, action) => {
            state.success = false;
            state.errors = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMail.pending, (state) => {
                state.isMailSending = true;
            })
            .addCase(sendMail.fulfilled, (state, action) => {
                state.isMailSending = false;
                const data = action.payload;
                state.mailResult = {
                    'status' : data.status,
                    'msg': data.message
                }
            })
            .addCase(sendMail.rejected, (state, action) => {
                state.isMailSending = false;
                state.mailResult = {
                    'status' : 'error',
                    'msg': i18n.t('errors.unkownError')
                }
            })
            .addCase(setNewPassword.pending, (state) => {})
            .addCase(setNewPassword.fulfilled, (state, action) => {
                const data = action.payload;
                state.setPasswordResult = {
                    'status': data.status,
                    'msg': data.message
                }
            })
            .addCase(setNewPassword.rejected, (state, action) => {
                state.setPasswordResult = {
                    'status' : 'error',
                    'msg': i18n.t('errors.unkownError')
                }
            })
    },
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
