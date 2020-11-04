import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {MovieShortInfo, MoviesResponse} from '../movies/movies.component';
import {map} from 'rxjs/operators';
import {GenresService} from './genres.service';
import {Genre} from '../genres/genres.component';
import {DetailedMovie} from '../movies/movie/movie.component';
import {SimilarMovie} from '../movies/movie/similar-movie-carousel/similar-movie-carousel.component';

@Injectable({providedIn: 'root'})
export class MoviesService {
  genres: Genre[];

  constructor(private httpClient: HttpClient, private genresService: GenresService) {
    this.genresService.getAll().subscribe(genres => this.genres = genres);
  }

  getMoviesFromSection(section: string, page: number): Observable<MoviesResponse> {
    return this.httpClient.get<MoviesResponse>(`${environment.TMDBUrl}movie/${section.replace(' ', '_')}?api_key=${environment.ApiKey}&include_adult=false&language=en-US&page=${page}`)
      .pipe(map((response: any) => {
        return this.castResponse(response);
      }));
  }
  getMoviesByGenre(genreId: number, page: number): Observable<MoviesResponse> {
    return this.httpClient.get<MoviesResponse>(`${environment.TMDBUrl}discover/movie?api_key=${environment.ApiKey}&with_genres=${genreId}&include_adult=false&page=${page}`)
      .pipe(map((response: any) => {
        return this.castResponse(response);
      }));
  }
  getMoviesByKey(searchString: string, page: number): Observable<MoviesResponse> {
    if (searchString.trim()) {
      return this.httpClient.get<MoviesResponse>(`${environment.TMDBUrl}search/movie?api_key=${environment.ApiKey}&query=${searchString.trim()}&include_adult=false&page=${page}`)
        .pipe(map((response: any) => {
          return this.castResponse(response);
        }));
    }
  }
  private castResponse(response): MoviesResponse {
    return {
      page: response.page,
      totalPages: response.total_pages,
      results: response.results.map(movie => {
        const newMovie: MovieShortInfo = {
          id: movie.id,
          title: movie.title,
          genres: this.parseGenresNamesList(movie.genre_ids),
          releaseDate: movie.release_date,
          posterPath: movie.poster_path,
          voteAverage: movie.vote_average
        };
        return newMovie;
      })
    };
  }
  private parseGenresNamesList(genresIds: number[]): string {
    return genresIds.map(genreID => this.genres.find(genre => genre.id === genreID).name)
      .join(', ');
  }
  getMovieById(id: number): Observable<DetailedMovie> {
    return this.httpClient.get<DetailedMovie>(`${environment.TMDBUrl}movie/${id}?api_key=${environment.ApiKey}&language=en-US&append_to_response=videos`)
      .pipe(map((movie: any) => {
        return {
          id: movie.id,
          title: movie.title,
          backdropPath: movie.backdrop_path,
          voteAverage: movie.vote_average,
          tagline: movie.tagline,
          genres: movie.genres,
          runtime: movie.runtime,
          releaseDate: movie.release_date,
          productionCountries: movie.production_countries,
          budget: movie.budget,
          revenue: movie.revenue,
          overview: movie.overview,
          trailers: movie.videos.results.map(trailer => {
            return {
              name: trailer.name,
              key: trailer.key
            };
          })
        };
    }));
  }
  getSimilarMovies(id: number): Observable<SimilarMovie[]> {
    return this.httpClient.get<SimilarMovie[]>(`${environment.TMDBUrl}movie/${id}/similar?api_key=${environment.ApiKey}&language=en-US&page=1`)
      .pipe(map((response) => {
        return (response['results'].map(movie => {
          return {
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path
          };
        }));
      }));
  }
}
