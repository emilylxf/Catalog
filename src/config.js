const CLIENT_ID = "0oa13dfryq3ffhUKb5d7"
const ISSUER = "https://dev-19217834.okta.com/oauth2/default"
const REDIRECT_URI = window.origin;
export default {
    oktaConfig: {
        clientId: CLIENT_ID,
        issuer: ISSUER,
        redirectUri: window.origin,
        scopes: ['openid', 'profile', 'email'],
        pkce: true
  },
    oktaSignInConfig: {
        baseUrl: 'https://dev-19217834.okta.com',
        clientId: CLIENT_ID,
        issuer: ISSUER,
        redirectUri: REDIRECT_URI,
        features: {
           registration: true // REQUIRED
        }
  },
};