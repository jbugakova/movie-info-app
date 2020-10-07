import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {ShareGenreIdService} from '../services/shareGenreId.service';

import {Observable} from 'rxjs';

export interface Movie {
  id: number;
  title: string;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies$: Observable<Movie[]>;

  genreId: number = null;

  constructor(private movieService: MoviesService, private shareGenreIdService: ShareGenreIdService) {
    this.shareGenreIdService.onGenreClick.subscribe(genreId => {
      this.genreId = genreId;
      this.movies$ = this.movieService.getMoviesByGenre(this.genreId);
    });
  }

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies();
  }
}
