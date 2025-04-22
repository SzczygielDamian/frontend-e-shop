import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  getAuthToken(): string {   
    return this.oktaAuth.getAccessToken() as string;
  }
}
