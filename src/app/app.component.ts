import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-info-app';
  currGenreID: number = null;
  public onGenreClicked(currGenreID) {
    this.currGenreID = currGenreID;
  }
}
