import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Genre} from '../genres/genres.component';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class GenresService {
  constructor(private httpClient: HttpClient) {
  }
  getAll(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(`${environment.TMDBUrl}genre/movie/list?api_key=${environment.ApiKey}`)
      .pipe(map((response) => {
        return response['genres'];
      }));
  }
}
