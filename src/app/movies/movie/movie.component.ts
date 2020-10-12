import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../movies.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  backdropUrl: string = 'https://image.tmdb.org/t/p/w1280';
  movie$: Observable<Movie>;

  constructor(
    private activateRoute: ActivatedRoute,
    private moviesService: MoviesService
  ) {
  }

  ngOnInit(): void {
    this.movie$ = this.activateRoute.params
      .pipe(switchMap((params: Params) => {
        return this.moviesService.getMovieById(params['id'])
      }));
  }
}