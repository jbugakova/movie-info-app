import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../services/movies.service';

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

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies();
  }

}
