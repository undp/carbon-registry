import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { AppService } from "../../../app.service";
import {MRV_INVENTORY_YEAR_CONFIG_STR} from "../../../app.constants";
@Component({
  selector: "app-ghg-config",
  templateUrl: "./ghg-config.component.html",
  styleUrls: ["./ghg-config.component.scss"],
})
export class GhgConfigComponent implements OnInit {
  uploadType: any = "1";
  ghgConfigForm: FormGroup;
  allSelected:boolean;
  constructor(private appsrvc: AppService, private formBuilder: FormBuilder, private appService:AppService) {}
  yearList: any;
  ngOnInit() {
    this.ghgConfigForm = this.formBuilder.group({
      key:MRV_INVENTORY_YEAR_CONFIG_STR,
      value: ["file", [Validators.required]],
      inventoryYears: [[], [Validators.required]],
    });
    this.yearList = [];
    this.getYears();
  }
  getYears() {
    this.appsrvc.getInventoryYears().subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.yearList = res.data;
          this.getConfigYear('file');
        }
      },
      (err) => {}
    );
  }
  saveConfig() {
    console.log(this.ghgConfigForm);
    this.appService.saveAppData(this.ghgConfigForm.value).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          this.ghgConfigForm.patchValue({inventoryYears: (res.data.inventoryYears || [])}) ;
        }
      },
      (err) => {}
    );
  }
  getConfigYear(type){
    this.appService.getConfigYear(type).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.yearList = res.data;
          this.ghgConfigForm.patchValue({
            inventoryYears: res.data
          });

        }
      },(err) => {

      }
    );
  }
  toggleAllSelection() {
    console.log(this.ghgConfigForm.value);

    if (this.ghgConfigForm.value.inventoryYears && this.ghgConfigForm.value.inventoryYears.length
      && this.ghgConfigForm.value.inventoryYears.indexOf("selectAllYear") != -1) {
        let allYearSelection = this.yearList;
        allYearSelection = allYearSelection.concat("selectAllYear");
        console.log("allYearSelection",allYearSelection);
        
      this.ghgConfigForm.patchValue({inventoryYears:allYearSelection});
      // this.select.options.forEach((item: MatOption) => item.select());
    } else {
      // this.select.options.forEach((item: MatOption) => item.deselect());
      this.ghgConfigForm.patchValue({inventoryYears: [] });
    }
  }
}
