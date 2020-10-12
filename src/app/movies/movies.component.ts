import {Component, Input, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {ShareGenreIdService} from '../services/shareGenreId.service';
import {ShareSearchStringService} from '../services/shareSearchString.service';

import {Observable} from 'rxjs';

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
    private movieService: MoviesService,
    private shareGenreIdService: ShareGenreIdService,
    private shareSearchStringService: ShareSearchStringService
  ) {
    this.shareGenreIdService.onGenreClick.subscribe(genreId => {
      this.genreId = genreId;
      this.currPage = 1;
      this.response$ = this.movieService.getMoviesByGenre(this.genreId, this.currPage);
      this.currGetMovieMethod = GetMovieMethod.ByGenre;
    });
    this.shareSearchStringService.search.subscribe(search => {
      this.currPage = 1;
      this.search = search;
      this.response$ = this.movieService.getMoviesByKey(this.search, this.currPage);
      this.currGetMovieMethod = GetMovieMethod.ByString;
    });
  }

  ngOnInit(): void {
    this.currPage = 1;
    this.response$ = this.movieService.getMovies(this.currPage);
    this.currGetMovieMethod = GetMovieMethod.All;
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
  }
}
