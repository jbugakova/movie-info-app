import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'countryList'
})
export class CountryListPipe implements PipeTransform {
  transform(countries): string {
    return countries.map((country) => country.name).toString().replace(/,/gi, ', ');
  }
}
