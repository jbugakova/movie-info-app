import {Component, OnInit} from '@angular/core';
import {GenresService} from '../services/genres.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';

export interface Genre {
  name: string;
  id: number;
}

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres$: Observable<Genre[]>;
  currGenreId: number;

  constructor(
    private genresService: GenresService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.genres$ = this.genresService.getAll();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.with_genres) {
        this.genresService.getGenreIdByName(params.with_genres).subscribe(genreID => {
          this.currGenreId = genreID;
        });
      } else {
        this.currGenreId = null;
      }
    });
  }

  onGenreClick(event: any): void {
    const genre = event.target.innerText;
    this.router.navigate(['/movies'], {
      queryParams: {
        with_genres: genre.toLowerCase()
      }
    });
  }
}
