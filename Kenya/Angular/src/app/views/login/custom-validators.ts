import { ValidationErrors, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(group: FormGroup) {
    const newpassword: string = group.controls.password.value; // get password from our password form control
    const confirmpassword: string = group.controls.confirmPassword.value; // get password from our confirmPassword form control
    // compare is the password math
    if (newpassword !== confirmpassword) {
      // if they don't match, set an error in our confirmPassword form control
      group.controls.confirmPassword.setErrors({ NoPassswordMatch: true });
    }
  }
  static termsAccepted(control : AbstractControl){
    const terms  = control.get('termsCheckbox').value;
    if(!terms || terms != true){
      control.get('termsCheckbox').setErrors({ required: true });
    }
  }
}