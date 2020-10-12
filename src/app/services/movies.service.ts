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
  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${environment.TMDBUrl}movie/popular?api_key=${environment.ApiKey}&language=en-US&page=1`)
      .pipe(map((response) => {
        return response['results'];
      }));
  }
  getMoviesByGenre(genreId: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${environment.TMDBUrl}discover/movie?api_key=${environment.ApiKey}&with_genres=${genreId}&page=1`)
      .pipe(map((response) => {
        return response['results'];
      }));
  }
  getMoviesByKey(searchString: string): Observable<Movie[]> {
    if (searchString.trim()) {
      return this.httpClient.get<Movie[]>(`${environment.TMDBUrl}search/movie?api_key=${environment.ApiKey}&query=${searchString.trim()}&page=1`)
        .pipe(map((response) => {
          return response['results'];
        }));
    }
  }
}
