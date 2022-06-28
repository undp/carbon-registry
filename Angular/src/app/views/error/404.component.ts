import { Component, Input } from '@angular/core';

@Component({
  selector : 'error-404',
  templateUrl: '404.component.html'
})
export class P404Component {
 @Input() data : any ;  
  constructor() { }

  ngOnInit(){
    
  }
}
