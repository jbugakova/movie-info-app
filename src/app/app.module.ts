import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';

import {AppComponent} from './app.component';
import {GenresComponent} from './genres/genres.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieComponent} from './movie/movie.component';
import {GenresListPipe} from './pipes/genres-list.pipe';
import {CountryListPipe} from './pipes/country-list.pipe';
import {MoneyFormatterPipe} from './pipes/money-formatter.pipe';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ScrollModule} from './scroll.module';
import { DropdownListComponent } from './dropdown-list/dropdown-list.component';
import {TrailersComponent} from './movie/trailers/trailers.component';
import {SimilarMovieCarouselComponent} from './movie/similar-movie-carousel/similar-movie-carousel.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    GenresComponent,
    MoviesComponent,
    MovieComponent,
    HomeComponent,
    NotFoundComponent,
    GenresListPipe,
    CountryListPipe,
    MoneyFormatterPipe,
    DropdownListComponent,
    TrailersComponent,
    SimilarMovieCarouselComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    ScrollModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
