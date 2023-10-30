import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import jwtService from 'app/services/jwtService';
import { createUserSettingsFirebase, setUserData } from './userSlice';

export const submitRegister = ({ displayName, password, email }) => async (dispatch) => {
    return jwtService
        .createUser({
            // displayName,
            password,
            email,
        })
        .then((user) => {
            dispatch(setUserData(user));
            return dispatch(registerSuccess());
        })
        .catch((error) => {
            // return dispatch(registerError(errors));
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
};

const registerSlice = createSlice({
    name: 'auth/register',
    initialState,
    reducers: {
        registerSuccess: (state, action) => {
            state.success = true;
            state.errors = [];
        },
        registerError: (state, action) => {
            state.success = false;
            state.errors = action.payload;
        },
    },
    extraReducers: {},
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
