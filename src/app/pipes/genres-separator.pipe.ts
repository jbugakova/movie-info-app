import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genresSeparator'
})
export class GenresSeparatorPipe implements PipeTransform {
  transform(genresArr): string {
    return genresArr.map((genre) => genre.name).toString().replace(/,/gi, ' / ');
  }
}
