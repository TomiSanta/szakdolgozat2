import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intToHuf'
})
export class IntToHufPipe implements PipeTransform {

  transform(price: number): string {
    let new_price = '';
    for (let i = price.toString().length - 1, j = 0; i >= 0; i--, j++) {
      if (j % 3 === 0) {
        new_price += ' ';
      }
      new_price += price.toString().charAt(i);
    }
    return new_price.toString().split("").reverse().join("") + 'Ft';
  }

}
