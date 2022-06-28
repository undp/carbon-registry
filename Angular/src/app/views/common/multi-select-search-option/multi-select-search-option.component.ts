import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';
import { SelectData } from './interface';

@Component({
  selector: 'app-multi-select-search-option',
  templateUrl: './multi-select-search-option.component.html',
  styleUrls: ['./multi-select-search-option.component.scss']
})
export class MultiSelectSearchOption implements OnInit, OnDestroy,AfterViewInit {
  @Input() dataList:any;
  @Output() getSelection = new EventEmitter<string>();
  public selectCtrl: FormControl = new FormControl();

  public filterCtrl: FormControl = new FormControl();

  public filteredData: ReplaySubject<SelectData[]> = new ReplaySubject<SelectData[]>(1);
  
   protected _onDestroy = new Subject<void>();
   @ViewChild('multiSelect', { static: false }) multiSelect: MatSelect;

  constructor() { }

  ngOnInit() {
    console.log(this.dataList);
    // load the initial bank list
    this.filteredData.next(this.dataList.slice());
    // listen for search field value changes
    this.filterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterBanks();
    });
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  protected setInitialValue() {
    this.filteredData
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredData are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: SelectData, b: SelectData) => a && b && a.id === b.id;
      });
      console.log("Test Data", this.filteredData);
  }

  protected filterBanks() {
    if (!this.dataList) {
      return;
    }
    // get the search keyword
    let search = this.filterCtrl.value;
    if (!search) {
      this.filteredData.next(this.dataList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredData.next(
      this.dataList.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
  selectionChanged(value){
    this.getSelection.emit(value);
  }

}
