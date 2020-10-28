import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'genresList'
})
export class GenresListPipe implements PipeTransform {
  transform(genresArr): string {
    return genresArr.map((genre) => genre.name).toString().replace(/,/gi, ', ');
  }
}
