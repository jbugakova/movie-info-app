import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  searchStr: string;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      searchMovie: new FormControl('')
    });
  }

  submitSearchForm(): void {
    // this.shareSearchStringService.searchString(this.form.value.searchMovie);
    // this.shareGenreIdService.resetGenre();
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset();
  }
}
