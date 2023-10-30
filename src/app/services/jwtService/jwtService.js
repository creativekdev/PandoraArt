import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import api from 'utils/api';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (err) => {
                return new Promise((resolve, reject) => {
                    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                      // if you ever get an unauthorized response, logout the user
                      this.emit('onAutoLogout', 'Invalid access_token');
                      this.setSession(null, null);
                    }
                    throw err;
                });
            }
        );
    };

    handleAuthentication = () => {
        const access_token = this.getAccessToken();
        const refresh_token = this.getRefreshToken();

        if (!access_token || !refresh_token) {
            this.emit('onNoAccessToken');

            return;
        }

        if (this.isAuthTokenValid(access_token) || this.isAuthTokenValid(refresh_token)) {
            this.setSession(access_token, refresh_token);
            this.emit('onAutoLogin', true);
        } else {
            this.setSession(null, null);
            this.emit('onAutoLogout', 'Token was expired');
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            api.post('/v1/auth/register', data)
            .then((response) => {
                if (response.data.status == "success") {
                    this.setSession(response.data.access_token, response.data.refresh_token);
                    const redirectUrl = localStorage.getItem('redirect_url') !== undefined ? localStorage.getItem('redirect_url') : '/home';
                    localStorage.removeItem('redirect_url');

                    var user = {
                        data: {
                            displayName: "",
                            email: data.email,
                            photoURL: ""
                        },
                        redirectUrl: redirectUrl,
                        role: 'user'
                    }
                    resolve(user);
                } else {
                    reject(response.data);
                }
            })
            .catch((error) => {
                reject(error);
            });
        });
    };

    signInWithEmailAndPassword = (data) => {
        return new Promise((resolve, reject) => {
            api.post('/v1/auth/login', data)
            .then((response) => {
                if (response.data.status == "success") {
                    this.setSession(response.data.access_token, response.data.refresh_token);
                    const redirectUrl = localStorage.getItem('redirect_url') !== undefined ? localStorage.getItem('redirect_url') : '/home';
                    localStorage.removeItem('redirect_url');

                    var user = {
                        data: {
                            displayName: "",
                            email: data.email,
                            photoURL: ""
                        },
                        redirectUrl: redirectUrl,
                        role: 'user'
                    }
                    resolve(user);
                } else {
                    reject(response.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
        });
    };

    signInWithGoogle = (data) => {
        return new Promise((resolve, reject) => {
            api.post('/v1/auth/loginWithGoogle', data)
            .then((response) => {
                if (response.data.status == "success") {
                    this.setSession(response.data.access_token, response.data.refresh_token);
                    const redirectUrl = localStorage.getItem('redirect_url') !== undefined ? localStorage.getItem('redirect_url') : '/home';
                    localStorage.removeItem('redirect_url');

                    var user = {
                        data: {
                            displayName: "",
                            email: data.email,
                            photoURL: ""
                        },
                        redirectUrl: redirectUrl,
                        role: 'user'
                    }
                    resolve(user);
                } else {
                    reject(response.data.error);
                }
            })
            .catch((error) => {
                reject(error);
            })
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            let access_token = this.getAccessToken();
            let refresh_token = this.getRefreshToken();

            if(access_token == null || refresh_token == null) {
                this.logout();
                reject(new Error('Failed to login with token.'));
            }

            if(this.isAuthTokenValid(access_token)) {
                this.setSession(access_token, refresh_token);
                var user = {
                    data: {
                        displayName: "",
                        email: "",
                        photoURL: ""
                    },
                    role: "user"
                }
                resolve(user);
            } else {
                api
                    .post('/v1/auth/jwt/refresh', {
                        refresh_token: refresh_token,
                        token: access_token
                    })
                    .then((response) => {
                        if (response.data.status == "success") {
                            this.setSession(response.data.access_token, response.data.refresh_token);

                            var user = {
                                data: {
                                    displayName: "",
                                    email: "",
                                    photoURL: ""
                                },
                                role: "user"
                            }
                            resolve(user);
                        } else {
                            this.logout();
                            reject(new Error('Failed to login with token.'));
                        }
                    })
                    .catch((error) => {
                        this.logout();
                        reject(new Error('Failed to login with token.'));
                    });
            }
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user,
        });
    };

    setSession = (access_token, refresh_token) => {
        if (access_token && refresh_token) {
            localStorage.setItem('jwt_access_token', access_token);
            localStorage.setItem('jwt_refresh_token', refresh_token);
            axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        } else {
            localStorage.removeItem('jwt_access_token');
            localStorage.removeItem('jwt_refresh_token');
            delete axios.defaults.headers.common.Authorization;
        }
    };

    logout = () => {
        this.setSession(null, null);
    };

    isAuthTokenValid = (access_token) => {
        if (!access_token) {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            return false;
        }

        return true;
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };

    getRefreshToken = () => {
        return window.localStorage.getItem('jwt_refresh_token');
    }
}

const instance = new JwtService();

export default instance;
