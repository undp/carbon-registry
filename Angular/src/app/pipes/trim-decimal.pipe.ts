import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimDecimal'
})
export class TrimDecimalPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let floatValue = parseFloat(value);
    if(isNaN(floatValue)) {
      return value;
    }
   
    value = floatValue.toFixed(4);
    return value;
  }

}
