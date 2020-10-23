import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import {AppComponent} from './app.component';
import {GenresComponent} from './genres/genres.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieComponent} from './movies/movie/movie.component';
import {GenresListPipe} from './genres.pipe';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ScrollModule} from './scroll.module';
import { DropdownListComponent } from './dropdown-list/dropdown-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GenresComponent,
    MoviesComponent,
    MovieComponent,
    HomeComponent,
    NotFoundComponent,
    GenresListPipe,
    DropdownListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    ScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
