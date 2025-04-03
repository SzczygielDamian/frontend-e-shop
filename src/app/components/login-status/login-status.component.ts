import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  standalone: false,
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginStatusComponent implements OnInit {
    isAuthenticated: boolean = false;
    userName: string = '';

    constructor(private oktaAuthService: OktaAuthStateService,
      @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
    ) {}
  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(
      (res) => {
        this.isAuthenticated = res.isAuthenticated!;
        this.getUserDetails();
      }
    )
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        (res) => {
          this.userName = res.name as string;
        }
      )
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
