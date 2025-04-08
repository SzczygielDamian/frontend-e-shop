import { ChangeDetectionStrategy, Component, Inject, OnInit, signal } from '@angular/core';
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
    isAuthenticated = signal(false);
    userName = signal('');
    initials = signal('');

    storage: Storage = sessionStorage;

    constructor(private oktaAuthService: OktaAuthStateService,
      @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
    ) {}
  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(
      (res) => {
        this.isAuthenticated.set(res.isAuthenticated!)
        this.getUserDetails();
      }
    )
  }

  getUserDetails() {
    if (this.isAuthenticated()) {
      this.oktaAuth.getUser().then(
        (res) => {
          this.storage.setItem('userEmail', JSON.stringify(res.email));
          this.userName.set(res.name as string);
          this.setInitials(res.name as string);
        }
      )
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }

  setInitials(fullName: string): void {
    const splitFullName = fullName.split(" ");
    const initials = splitFullName.map(part => part.charAt(0)).join("");
    this.initials.set(initials)
  }
}
