import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {GenresService} from '../services/genres.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {DomSanitizer, SafeUrl, Title} from '@angular/platform-browser';
import {filter} from 'rxjs/operators';

export interface MoviesResponse {
  page: number;
  totalPages: number;
  results: MovieShortInfo[];
}

export interface MovieShortInfo {
  id: number;
  title: string;
  genres: string;
  releaseDate: Date;
  posterPath: string;
  voteAverage: number;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  animations: [
    trigger('movie', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('2000ms 250ms ease-out')
      ])
    ])
  ]
})
export class MoviesComponent implements OnInit {
  response$: Observable<MoviesResponse>;
  genreId: number = null;
  currPage: number;
  searchString: string = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private movieService: MoviesService,
    private genresService: GenresService,
    private titleService: Title,
    private sanitizer: DomSanitizer
  ) {
    router.events.pipe(filter(e => e instanceof NavigationEnd && e.url.indexOf('movies') > -1)).subscribe(() => {
      this.saveCurrUrl();
    });
  }

  ngOnInit(): void {
    this.saveCurrUrl();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.currPage = params.page ? params.page : 1;
      this.resetSearchString();
      let currentPageTitle = null;

      if (params.with_genres) {
        this.genresService.getGenreIdByName(params.with_genres).subscribe(genreID => {
          this.genreId = genreID;
          this.response$ = this.movieService.getMoviesByGenre(this.genreId, this.currPage);
        });
        currentPageTitle = 'Genre - '  + this.toCapitalizeString(params.with_genres) + ' | Movie Info';
      } else if (params.search) {
        this.response$ = this.movieService.getMoviesByKey(params.search, this.currPage);
        this.searchString = params.search;
        currentPageTitle = params.search + ' - Search results | Movie Info';
      } else if (params.section) {
        this.response$ = this.movieService.getMoviesFromSection(params.section, this.currPage);
        currentPageTitle = this.toCapitalizeString(params.section) + ' | Movie Info';
      } else {
        this.response$ = this.movieService.getMoviesFromSection('popular', this.currPage);
        currentPageTitle = 'Movie Info';
      }

      this.setPageTitle(currentPageTitle);
    });
  }

  private saveCurrUrl(): void {
    sessionStorage.setItem('currHomeUrl', this.router.url);
  }

  pageChanged(event: any): void {
    this.currPage = event;

    this.router.navigate(['/movies'], {
      queryParams: {page: this.currPage},
      queryParamsHandling: "merge"
    });
  }

  getPosterUrl(posterKey: string): SafeUrl {
    if (posterKey) {
      return this.sanitizer.bypassSecurityTrustUrl('https://image.tmdb.org/t/p/w500/' + posterKey);
    } else {
      return '../assets/images/noposter.jpg';
    }
  }

  private resetSearchString(): void {
    this.searchString = null;
  }

  private setPageTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  private toCapitalizeString(str: string): string {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}
