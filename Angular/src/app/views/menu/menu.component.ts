import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  allMenus: any = [];
  availableMenus: any = ['ENERGY','IPPU','MITIGATION ACTION'];
  selectedMenu: string = "";
  selectedChildrens: any = ['WASTE','CLIMATE FINANCE'];

  menuForm: FormGroup;
  constructor(private readonly _fb: FormBuilder) {
    this.menuForm = this._fb.group({
      menu : [null, [Validators.required]]
    })
   }

   isInvalid(form, field, errorValue){
    if (errorValue == 'required' || 'ValidateDate') {
      return form.get(field).invalid && (form.get(field).touched || form.get(field).dirty) && form.get(field).hasError(errorValue);
    }
    else if (errorValue == 'pattern') {
      return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('required') && form.get(field).errors.pattern;
    }
    else if(errorValue == 'email'){
      return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('email')
    }
  }

  ngOnInit() {
  }

}
