import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../guards/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MatSnackBar } from '@angular/material';
import { ForgotpasswordServiceService } from './forgotpassword-service.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  forgotpasswordForm :FormGroup;
  constructor(private router : Router , private _authService: AuthService ,private _snackBar: MatSnackBar,private _fb : FormBuilder,private ls : ForgotpasswordServiceService ) { 

  }

  ngOnInit() {
    this.forgotpasswordForm = this._fb.group({
      //phone : ['', [Validators.required , Validators.pattern("[0-9]{10}")]],
      email : ['', [Validators.required , Validators.email]],
    })
  }


  forgotPassword() {
    console.log(this.forgotpasswordForm);
    
    this.ls.ForgotPassword(this.forgotpasswordForm.value).subscribe((res: any) => {
      if (res.statusCode == 200) {
        console.log(res);
        this.openSnackBar(res.message, 'close' , 'success')
        this.router.navigate(['getotp',res.data ]);
      }
      else {
        console.log('failed');
      }
    }, err => {
      console.log(err);
      console.log('somegthing went wrong');
    })

    
  }
 
  goToLogin(){
    this.router.navigate(['login']);
  }

  openSnackBar(message: string,action : string, type: string) {
    this._snackBar.openFromComponent(SnackbarDialogComponent, {
      duration: 3000,
      panelClass : 'snackbar-global',
      data: {
        message: message,
        action : Action,
        type:type
      }
    });
  }
}
