import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreditCardService } from '../../services/credit-card.service';
import { Observable } from 'rxjs';
import { CustomValidatorsService } from '../../services/custom-validators.service';

@Component({
  selector: 'app-check-out',
  standalone: false,
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
    CreditCardService,
  ],
})
export class CheckOutComponent implements OnInit {

  private _formBuilder = inject(FormBuilder);
  private crediCardService = inject(CreditCardService);
  
  creditCardMonth$?: Observable<number[]>;
  creditCardYear$?: Observable<number[]>;

  customer = this._formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    lastName: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  });
  shippingAddress = this._formBuilder.group({
    country: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    street: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    city: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    state: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{3}$')]],
  });
  creditCard = this._formBuilder.group({
    cardType: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    nameOnCard: ['', [Validators.required, Validators.minLength(2), CustomValidatorsService.notOnlyWhitespace]],
    cardNumber: ['',  [Validators.required, Validators.pattern('^[0-9]{16}$')]],
    securityCode: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    expirationMonth: ['', Validators.required],
    expirationYear: ['', Validators.required],
  });

  ngOnInit(): void {
    this.creditCardMonth$ = this.crediCardService.getCreditCardMonth();
    this.creditCardYear$ = this.crediCardService.getCreditCardYears();
  }
}
