import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Genre} from '../../environments/interface';

@Injectable({providedIn: 'root'})
export class GenresService {
  constructor(private httpClient: HttpClient) {
  }
  getAll(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(`${environment.TMDBUrl}genre/movie/list?api_key=${environment.ApiKey}`)
      .pipe(map((response) => response['genres']));
  }
  getGenreIdByName(name: string): Observable<number> {
    return this.httpClient.get<number>(`${environment.TMDBUrl}genre/movie/list?api_key=${environment.ApiKey}`)
      .pipe(map((response) => response['genres'].find(genre => genre.name.toLowerCase().indexOf(name) > -1).id));
  }
}
