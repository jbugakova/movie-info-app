import { Component, OnInit } from '@angular/core';
import {GenresService} from '../services/genres.service';

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

  constructor(private genresService: GenresService) { }

  ngOnInit(): void {
    this.genres$ = this.genresService.getAll();
  }

}
