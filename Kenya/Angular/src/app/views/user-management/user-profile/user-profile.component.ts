import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userDetails : any;
  public userForm : FormGroup
  public passwordUpdateForm : FormGroup
  constructor(
    private activatedRoute : ActivatedRoute,
    private fb : FormBuilder,
  private appsrvc:AppService
  ) { }

  ngOnInit() {
    let x =  localStorage.getItem('loggedInUser');
    this.userDetails = JSON.parse(x);
    this.userForm = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.required, Validators.pattern("[A-Za-z ]+")
      ])],
      lastName: ['', [Validators.pattern("[A-Za-z ]+")]],
      email: ['', [Validators.required]],
    });

    this.passwordUpdateForm = this.fb.group({
      userId: [this.userDetails._id],
      password: ['', Validators.compose([
        Validators.required
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required
      ])]

    });
    this.initUserFrom();
  }
  public updateUser(){
    this.appsrvc.updateUser(this.userDetails).subscribe(res=>{
      if(res.statusCode == 200) {
        console.log("success in data update", res.data);
        // update data in session
        localStorage.setItem("loggedInUser", JSON.stringify(res.data));
      }
    },err=> {
      console.error("success in data update", err);
    })
  }
  public updatePassword(){
    // prepare payload
    let payload = {
      password: this.passwordUpdateForm.controls['password'].value,
      confirmPassword: this.passwordUpdateForm.controls['confirmPassword'].value,
      userId: JSON.parse(localStorage.getItem('loggedInUser'))._id,
    }
    this.appsrvc.updatePassword(payload).subscribe(res=>{
      if(res.statusCode == 200) {
        console.log("success in data update", res.data);
      }
    },err=> {
      console.error("success in data update", err);
    })
  }
  public initUserFrom(){
    // this.userForm.controls['username'].setValue(this.userDetails.username);
    // this.userForm.controls['password'].setValue(this.userDetails.password);
    this.userForm.controls['firstName'].setValue(this.userDetails.firstName);
    this.userForm.controls['lastName'].setValue(this.userDetails.lastName);
    this.userForm.controls['email'].setValue(this.userDetails.email);
    // this.userForm.controls['status'].setValue(this.userDetails.status);
}

}
