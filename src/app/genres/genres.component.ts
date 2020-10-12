import { Component, OnInit} from '@angular/core';
import {GenresService} from '../services/genres.service';
import {ShareGenreIdService} from '../services/shareGenreId.service';

import {Observable} from 'rxjs';
import {ShareSearchStringService} from '../services/shareSearchString.service';

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

  constructor(
    private genresService: GenresService,
    private shareGenreIdService: ShareGenreIdService,
    private shareSearchStringService: ShareSearchStringService
  ) {
    this.shareGenreIdService.onGenreClick.subscribe(id => this.currGenreId = id);
    this.shareGenreIdService.resetGenreEvent.subscribe(() => this.currGenreId = null);
  }

  ngOnInit(): void {
    this.genres$ = this.genresService.getAll();
  }

  onGenreClick(event: any): void {
    const genreId = event.target.dataset.genreId;
    this.shareGenreIdService.changeGenre(genreId);
    this.shareSearchStringService.resetSearchString();
  }
}
