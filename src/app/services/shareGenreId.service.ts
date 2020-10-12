import {EventEmitter, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ShareGenreIdService {
  onGenreClick: EventEmitter<number> = new EventEmitter<number>();
  resetGenreEvent: EventEmitter<any> = new EventEmitter<any>();

  public changeGenre(id: number): void {
    this.onGenreClick.emit(id);
  }
  public resetGenre(): void {
    this.resetGenreEvent.emit();
  }
}
