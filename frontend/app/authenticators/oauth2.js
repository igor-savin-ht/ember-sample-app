//since we are first-party client, password grant type is the most appropriate one
import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
import config from '../config/environment';

export default OAuth2PasswordGrantAuthenticator.extend({
    serverTokenEndpoint: `${config.APP.API_HOST}/${config.APP.API_NAMESPACE}/auth`
});