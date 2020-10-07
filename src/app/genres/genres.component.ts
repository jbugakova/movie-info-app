import { Component, OnInit} from '@angular/core';
import {GenresService} from '../services/genres.service';
import {ShareGenreIdService} from '../services/shareGenreId.service';

import {Observable} from 'rxjs';

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
  currGenreId: number = null;

  constructor(private genresService: GenresService, private shareGenreIdService: ShareGenreIdService) {
    this.shareGenreIdService.onGenreClick.subscribe(id => this.currGenreId = id);
  }

  ngOnInit(): void {
    this.genres$ = this.genresService.getAll();
  }

  onGenreClick(event: any): void {
    const genreId = event.target.dataset.genreId;
    this.shareGenreIdService.changeGenre(genreId);
  }
}
