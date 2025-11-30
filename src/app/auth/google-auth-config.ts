import { AuthConfig } from 'angular-oauth2-oidc';

export const googleAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,

  redirectUri: window.location.origin + '/signin-google',
  clientId: '203397672047-r9ist046r3t0fd4vsp3mtqg65hg1p4fa.apps.googleusercontent.com',
  scope: 'openid profile email',
 // 💡 Add this line to force the user to select an account or re-authenticate
  customQueryParams: {
    prompt: 'select_account' 
  },
  showDebugInformation: true,
};
