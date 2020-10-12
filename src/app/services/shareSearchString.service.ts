import {EventEmitter, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ShareSearchStringService {
  search: EventEmitter<string> = new EventEmitter<string>();
  reset: EventEmitter<null> = new EventEmitter<null>();

  public searchString(search: string): void {
    this.search.emit(search);
  }
  public resetSearchStr(): void {
    this.reset.emit();
  }
}
