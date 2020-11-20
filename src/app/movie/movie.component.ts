import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import {DomSanitizer, SafeUrl, Title} from '@angular/platform-browser';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {MoviesService} from '../services/movies.service';
import {DetailedMovie} from '../../environments/interface';


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
        animate('500ms 250ms ease-out')
      ])
    ]),
    trigger('movieBackground', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('500ms 200ms ease-out')
      ])
    ])
  ]
})
export class MovieComponent implements OnInit {
  movie$: Observable<DetailedMovie>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private moviesService: MoviesService,
    private titleService: Title,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.movie$ = this.activatedRoute.params
                      .pipe(switchMap((params: Params) => {
                        return this.moviesService.getMovieById(params['id']);
                      }));

    this.movie$.subscribe(movie => {
      this.titleService.setTitle(movie.title + ' | Movie Info');
    });
  }

  onHomeBtnClick(): void {
    this.router.navigateByUrl(sessionStorage.getItem('currHomeUrl'));
  }

  onPrevPageClick(): void {
    this.location.back();
  }

  getBackdropUrl(backdropKey: string): SafeUrl {
    if (backdropKey) {
      return this.sanitizer.bypassSecurityTrustUrl('https://image.tmdb.org/t/p/w1280' + backdropKey);
    } else {
      return './assets/images/no-backdrop.jpg';
    }
  }
}
