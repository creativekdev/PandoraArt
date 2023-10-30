import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import jwtService from 'app/services/jwtService';
import { Component } from 'react';
import { connect } from 'react-redux';
import history from '@history';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

import { setUserDataFirebase, setUserDataAuth0, setUserData, logoutUser } from './store/userSlice';

class Auth extends Component {
  state = {
    waitAuthCheck: true,
  };

  componentDidMount() {
    return Promise.all([
      this.jwtCheck(),
    ]).then(() => {
      this.setState({ waitAuthCheck: false });
    });
  }

  jwtCheck = () =>
    new Promise((resolve) => {
      jwtService.on('onAutoLogin', () => {
        // this.props.showMessage({ message: 'Logging in with token' });

        /**
         * Sign in and retrieve user data from Api
         */
        jwtService
          .signInWithToken()
          .then((user) => {
            this.props.setUserData(user);

            resolve();

            // this.props.showMessage({ message: 'Logged in successfully' });
          })
          .catch((error) => {
            // this.props.showMessage({ message: error.message });

            resolve();
          });
      });

      jwtService.on('onAutoLogout', (message) => {
        if (message) {
          // this.props.showMessage({ message });
        }

        this.props.logout();

        resolve();
      });

      jwtService.on('onNoAccessToken', () => {
        const redirectUrl = localStorage.getItem('redirectUrl');
        const currentUrl = window.location.pathname;

        if(currentUrl == redirectUrl)
            history.push(redirectUrl);
        else {
            if(currentUrl.indexOf('/login') == -1 || currentUrl.indexOf('/prompt/') !== -1) {
                localStorage.setItem("redirectUrl", currentUrl == '/' ? '/home' : currentUrl)
                history.push(currentUrl == '/' ? '/home' : currentUrl);
            }
            else
                history.push(redirectUrl);
        }

        // const redirectUrl = localStorage.getItem('redirectUrl');
        // const currentUrl = window.location.href;
        // if(currentUrl.indexOf('/prompt/') == -1) {
        //   history.push(redirectUrl ?? '/home');
        // }
        resolve();
      });

      jwtService.init();

      return Promise.resolve();
    });

  render() {
    return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: logoutUser,
      setUserData,
      setUserDataAuth0,
      setUserDataFirebase,
      showMessage,
      hideMessage,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Auth);
