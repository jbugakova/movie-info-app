import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GenresComponent } from './genres/genres.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movies/movie/movie.component';
import { GenresListPipe } from './genres.pipe';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GenresComponent,
    MoviesComponent,
    MovieComponent,
    NotFoundComponent,
    HomeComponent,
    GenresListPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
