import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MoviesService} from '../../services/movies.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {Title} from '@angular/platform-browser';
import {Genre} from '../../genres/genres.component';

export interface DetailedMovie {
  id: number;
  title: string;
  backdropPath: string;
  voteAverage: number;
  tagline: string;
  genres: Genre[];
  runtime: number;
  releaseDate: Date;
  productionCountries: string[];
  budget: number;
  revenue: number;
  overview: string;
  trailers: Trailer[];
}

export interface Trailer {
  key: string;
  name: string;
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  animations: [
    trigger('movie', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('1000ms ease-out')
      ])
    ])
  ]
})
export class MovieComponent implements OnInit {
  backdropUrl = 'https://image.tmdb.org/t/p/w1280';
  movie$: Observable<DetailedMovie>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private moviesService: MoviesService,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.movie$ = this.activatedRoute.params
                      .pipe(switchMap((params: Params) => {
                        return this.moviesService.getMovieById(params['id']);
                      }));

    this.movie$.subscribe(movie => { this.titleService.setTitle(movie.title + ' | Movie Info'); });
  }

  onBackBtnClick(): void {
    this.location.back();
  }
}
