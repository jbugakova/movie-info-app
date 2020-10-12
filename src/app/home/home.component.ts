import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShareSearchStringService } from '../services/shareSearchString.service';
import { ShareGenreIdService } from '../services/shareGenreId.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  searchStr: string;

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
