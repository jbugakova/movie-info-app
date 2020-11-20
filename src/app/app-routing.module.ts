import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {MovieComponent} from './movie/movie.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MoviesComponent} from './movies/movies.component';


const routes: Routes = [
  { path: '', component: HomeComponent, children: [
      {path: '', redirectTo: '/movies', pathMatch: 'full'},
      {path: 'movies', component: MoviesComponent}
  ]},
  { path: 'movie/:id', component: MovieComponent },
  { path: 'error', component: NotFoundComponent },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
