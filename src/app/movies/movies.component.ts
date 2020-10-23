import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GenresService} from '../services/genres.service';

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
  response$: Observable<Movie[]>;
  moviesPostersUrl = `https://image.tmdb.org/t/p/w500/`;
  genreId: number = null;
  currPage: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MoviesService,
    private genresService: GenresService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currPage = params.page ? params.page : 1;
      if (params.with_genres) {
        this.genresService.getGenreIdByName(params.with_genres).subscribe(genreID => {
          this.genreId = genreID;
          this.response$ = this.movieService.getMoviesByGenre(this.genreId, this.currPage);
        });
      } else if (params.search) {
        this.response$ = this.movieService.getMoviesByKey(params.search, this.currPage);
      } else if (params.section) {
        this.response$ = this.movieService.getMoviesFromSection(params.section, this.currPage);
      } else {
        this.response$ = this.movieService.getMoviesFromSection('popular', this.currPage);
      }
    });
  }

  pageChanged(event: any): void {
    this.currPage = event;

    this.router.navigate(['/movies'], {
      queryParams: {page: this.currPage},
      queryParamsHandling: "merge"
    });
  }
}
