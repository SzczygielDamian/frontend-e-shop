import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  static notOnlyWhitespace(control: FormControl) : ValidationErrors | null {

    if ((control.value != null) && (control.value.trim().length === 0)) {
      return { 'notOnlyWhitespace': true };
    } else {
      return null;
    }
  }
}
