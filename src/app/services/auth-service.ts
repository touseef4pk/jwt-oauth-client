import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// 👉 OAuth imports
import { OAuthService } from 'angular-oauth2-oidc';
import { googleAuthConfig } from '../auth/google-auth-config' //'../oauth/google-auth-config';

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5003/api/authorize';


   constructor(private oAuth: OAuthService, private http: HttpClient) {
    this.oAuth.configure(googleAuthConfig);
  }

  // constructor(
  //   private http: HttpClient,
  //   private oauth: OAuthService
  // ) {
  //   // Configure Google OAuth
  //   this.oauth.configure(googleAuthConfig);
  //   this.oauth.loadDiscoveryDocument();
  // }

  // ---------------------
  // Normal Login (JWT)
  // ---------------------
  login(credentials: { username: string; password: string }): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, credentials);
  }

  refreshToken(): Observable<TokenResponse | null> {
    const refreshToken = localStorage.getItem('refresh_token');
    const token = localStorage.getItem('access_token');

    if (!refreshToken || !token) {
      return of(null);
    }

    return this.http.post<TokenResponse>(`${this.apiUrl}/refresh`, {
      token: token,
      refreshtoken: refreshToken
    });
  }

  storeTokens(tokens: TokenResponse) {
    localStorage.setItem('access_token', tokens.accessToken);
    localStorage.setItem('refresh_token', tokens.refreshToken);
  }

  clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // This method redirects the user to Google's End Session Endpoint,
    // which gives them a chance to log out of Google completely.
    this.oAuth.logoutUrl = 'https://accounts.google.com/logout'; // <-- Ensure this is set
    this.oAuth.logOut(true); 

    //this.oAuth.logOut(true);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl.replace('authorize', 'product') + '/GetProducts');
  }

  // ---------------------
  // GOOGLE LOGIN
  // ---------------------
   googleLogin() {
    this.oAuth.initLoginFlow(); // opens Google popup/screen
  }

  async processGoogleLogin() {
    const result = await this.oAuth.loadDiscoveryDocumentAndTryLogin();
    if (!this.oAuth.hasValidIdToken()) return null;

    const idToken = this.oAuth.getIdToken();

    // Send to .NET backend for validation + local JWT issue
    return this.http.post('http://localhost:5003/api/googleauth/login', { idToken });
  }

getCurrentUser() {
  const token = localStorage.getItem('access_token');
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));

  return {
    username: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  };
}


}
