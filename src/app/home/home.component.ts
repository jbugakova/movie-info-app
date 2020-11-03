import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router,
              private titleService: Title) {
    this.titleService.setTitle('Movie Info');
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      searchMovie: new FormControl('')
    });
  }

  submitSearchForm(): void {
    this.router.navigate(['/movies'], {
      queryParams: {
        search: this.form.value.searchMovie
      }
    });
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset();
  }
}
