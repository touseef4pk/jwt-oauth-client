import { AuthConfig } from 'angular-oauth2-oidc';

export const googleAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,

  redirectUri: window.location.origin + '/signin-google',
  clientId: '203397672047-r9ist046r3t0fd4vsp3mtqg65hg1p4fa.apps.googleusercontent.com',
  scope: 'openid profile email',

  showDebugInformation: true,
};
