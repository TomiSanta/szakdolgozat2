import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hufToInt'
})
export class HufToIntPipe implements PipeTransform {

  transform(price: string): number {
    let without_spaces = price;
    while (without_spaces.includes(' ')) {
      without_spaces = without_spaces.replace(' ', '');
    }
    return (parseInt(without_spaces.substring(0, without_spaces.length - 2)));
  }

}
