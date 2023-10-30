import JwtService from "app/services/jwtService";

function authorizedApi(apiCall) {
    return async (...args) => {
        const access_token = window.localStorage.getItem('jwt_access_token');
        if(!JwtService.isAuthTokenValid(access_token)) {
            const user = await JwtService.signInWithToken();
        }
        // Retry the API call with the new token
        const result = await apiCall(...args);
        return result;
    };
}

export default authorizedApi;