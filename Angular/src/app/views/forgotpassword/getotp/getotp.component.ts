import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../guards/auth.service';
import { GetotpServiceService } from './getotp-service.service';
import { SnackbarDialogComponent } from '../../modal/snackbar-dialog/snackbar-dialog.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { CustomValidators } from '../../login/custom-validators';

@Component({
  selector: 'app-getotp',
  templateUrl: './getotp.component.html',
  styleUrls: ['./getotp.component.scss']
})
export class GetotpComponent implements OnInit {

  getotpForm: FormGroup;
  public sub: Subscription;
  public userId: string;
  public email: string;
  public ForgotPassword : any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private _fb: FormBuilder, private _snackBar: MatSnackBar, private _authService: AuthService, private ls: GetotpServiceService) { }

  ngOnInit() {
    this.getotpForm = this._fb.group({
      otp: ['', [Validators.required, Validators.pattern("[0-9]{4}")]],
      password: ['', Validators.compose([
        Validators.required, CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[*@!#%&()^~{}]+/, { hasSpecialCharacters: true }),
        Validators.minLength(8)
      ])],

      confirmPassword: [null, Validators.compose([Validators.required])]
    }, { validator: CustomValidators.passwordMatchValidator })

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.email = params['email'];
    });
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  resetPassword() {
    var body = {
      "userId": this.userId,
      "otp": this.getotpForm.controls['otp'].value,
      "password": this.getotpForm.controls['password'].value,
      "confirmPassword": this.getotpForm.controls['confirmPassword'].value,
    }

    this.ls.resetPassword(body).subscribe((res: any) => {
      if ( res.statusCode == 200) {
        console.log(res);
        this.openSnackBar(res.message, 'close' , 'success')
        this.router.navigate(['login' ]);
      }
      else {
        console.log('failed');
      }
    }, err => {
      console.log(err);
      console.log('somegthing went wrong');
    })

    
  }
 public goToForgotPw(){
   this.router.navigate(['forgotpassword'])
 }

 
  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.openFromComponent(SnackbarDialogComponent, {
      duration: 3000,
      panelClass: 'snackbar-global',
      data: {
        message: message,
        action: Action,
        type: type
      }
    });
  }
}
