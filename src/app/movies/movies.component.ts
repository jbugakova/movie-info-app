import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {GenresService} from '../services/genres.service';

export interface Movie {
  id: number;
  title: string;
}

enum GetMovieMethod {
  All,
  ByGenre,
  ByString
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  response$: Observable<Movie[]>;
  moviesPostersUrl = `https://image.tmdb.org/t/p/w500/`;
  genreId: number = null;
  currPage: number;
  currGetMovieMethod: GetMovieMethod;
  search: string;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private genresService: GenresService
  ) {}

  ngOnInit(): void {
    this.currPage = 1;
    this.route.queryParams.subscribe((params: Params) => {
      if (params.with_genres) {
        this.currGetMovieMethod = GetMovieMethod.ByGenre;
        this.genresService.getGenreIdByName(params.with_genres).subscribe(genreID => {
          this.genreId = genreID;
          this.response$ = this.movieService.getMoviesByGenre(this.genreId, this.currPage);
        });
      } else {
        this.currGetMovieMethod = GetMovieMethod.All;
        this.response$ = this.movieService.getMovies(this.currPage);
      }
    });
  }

  pageChanged(event: any): void {
    this.currPage = event;
    switch (true) {
      case this.currGetMovieMethod === GetMovieMethod.All:
        this.response$ = this.movieService.getMovies(this.currPage);
        break;
      case this.currGetMovieMethod === GetMovieMethod.ByGenre:
        this.response$ = this.movieService.getMoviesByGenre(this.genreId, this.currPage);
        break;
      case this.currGetMovieMethod === GetMovieMethod.ByString:
        this.response$ = this.movieService.getMoviesByKey(this.search, this.currPage);
        break;
    }
    window.scrollTo(0, 0);
  }
}
