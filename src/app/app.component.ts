import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ShareSearchStringService} from './services/shareSearchString.service';
import {ShareGenreIdService} from './services/shareGenreId.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: 'app-root';
}
