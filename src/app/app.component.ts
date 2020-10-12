import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ShareSearchStringService} from './services/shareSearchString.service';
import {ShareGenreIdService} from './services/shareGenreId.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: 'app-root';
  form: FormGroup;
  searchStr: string;
  private currGenreId: number;

  constructor(private shareSearchStringService: ShareSearchStringService, private shareGenreIdService: ShareGenreIdService) {
    this.shareSearchStringService.search.subscribe(str => this.searchStr = str);
    this.shareSearchStringService.reset.subscribe(() => this.resetForm());
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      searchMovie: new FormControl('')
    });
  }

  submitSearchForm(): void {
    this.shareSearchStringService.searchString(this.form.value.searchMovie);
    this.shareGenreIdService.resetGenre();
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset();
  }
}
