import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Movie} from '../movies/movies.component';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MoviesService {
  constructor(private httpClient: HttpClient) {
  }

  getMovies(page: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${environment.TMDBUrl}movie/popular?api_key=${environment.ApiKey}&include_adult=false&language=en-US&page=${page}`)
      .pipe(map((response) => {
        return response;
      }));
  }
  getMoviesByGenre(genreId: number, page: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${environment.TMDBUrl}discover/movie?api_key=${environment.ApiKey}&with_genres=${genreId}&include_adult=false&page=${page}`)
      .pipe(map((response) => {
        return response;
      }));
  }
  getMoviesByKey(searchString: string, page: number): Observable<Movie[]> {
    if (searchString.trim()) {
      return this.httpClient.get<Movie[]>(`${environment.TMDBUrl}search/movie?api_key=${environment.ApiKey}&query=${searchString.trim()}&include_adult=false&page=${page}`)
        .pipe(map((response) => {
          return response;
        }));
    }
  }
}
