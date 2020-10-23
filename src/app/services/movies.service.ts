import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Movie} from '../movies/movies.component';
import {map} from 'rxjs/operators';
import {GenresService} from './genres.service';
import {Genre} from '../genres/genres.component';

@Injectable({providedIn: 'root'})
export class MoviesService {
  genres: Genre[];

  constructor(private httpClient: HttpClient, private genresService: GenresService) {
    this.genresService.getAll().subscribe(genres => this.genres = genres);
  }

  getMoviesFromSection(section: string, page: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${environment.TMDBUrl}movie/${section.replace(' ', '_')}?api_key=${environment.ApiKey}&include_adult=false&language=en-US&page=${page}`)
      .pipe(map((response) => {
        response['results'].map(movie => this.parseGenresNamesList(movie));
        return response;
      }));
  }
  getMoviesByGenre(genreId: number, page: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${environment.TMDBUrl}discover/movie?api_key=${environment.ApiKey}&with_genres=${genreId}&include_adult=false&page=${page}`)
      .pipe(map((response) => {
        response['results'].map(movie => this.parseGenresNamesList(movie));
        return response;
      }));
  }
  getMoviesByKey(searchString: string, page: number): Observable<Movie[]> {
    if (searchString.trim()) {
      return this.httpClient.get<Movie[]>(`${environment.TMDBUrl}search/movie?api_key=${environment.ApiKey}&query=${searchString.trim()}&include_adult=false&page=${page}`)
        .pipe(map((response) => {
          response['results'].map(movie => this.parseGenresNamesList(movie));
          return response;
        }));
    }
  }
  getMovieById(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${environment.TMDBUrl}movie/${id}?api_key=${environment.ApiKey}&language=en-US&append_to_response=videos`)
      .pipe(map((movie: Movie) => {
        return movie;
    }));
  }
  private parseGenresNamesList(movie): void {
    const genresNames = movie.genre_ids.map(genreID => this.genres.find(genre => genre.id === genreID).name);
    movie.genres = genresNames.join(', ');
  }
}
