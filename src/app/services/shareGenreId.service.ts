import {EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ShareGenreIdService {
  onGenreClick: EventEmitter<number> = new EventEmitter<number>();

  public changeGenre(id: number): void {
    this.onGenreClick.emit(id);
  }
}
