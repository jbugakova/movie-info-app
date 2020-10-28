import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'moneyFormatter'
})
export class MoneyFormatterPipe implements PipeTransform {
  transform(sum): string {
    return sum.toString().replace(/(?!^)(?=(?:\d{3})+$)/g, ' ');
  }
}
