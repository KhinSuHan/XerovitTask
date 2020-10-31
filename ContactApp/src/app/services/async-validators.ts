import { map } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { ApiService } from './api.service';

/**
 * validate user input email duplication
 */
export class ValidateEmailNotTaken {
  static createValidator(apiService: ApiService) {
    return (control: AbstractControl) => {
      return apiService.checkEmailNotTaken(control.value).pipe(map(res => {
        return (res.length) ? { emailTaken: true } : null;
      },
        error => console.log(error)));
    };
  }
}

/**
 * validate user input phone number duplication
 */
export class ValidatePhoneNoNotTaken {
  static createValidator(apiService: ApiService) {
    return (control: AbstractControl) => {
      return apiService.checkPhoneNoNotTaken(control.value).pipe(map(res => {
        return (res.length) ? { phoneNoTaken: true } : null;
      }));
    };
  }
}