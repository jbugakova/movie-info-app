import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MoviesService} from '../../../services/movies.service';
import {Observable} from 'rxjs';
import {Movie} from '../../movies.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-similar-movie-carousel',
  templateUrl: './similar-movie-carousel.component.html',
  styleUrls: ['./similar-movie-carousel.component.scss']
})
export class SimilarMovieCarouselComponent implements OnInit {
  @Input() id: number;
  @ViewChild('similarMoviesContainer') similarMoviesContainer: ElementRef = null;
  @ViewChild('similarMovies') similarMovies: ElementRef = null;
  response$: Observable<Movie[]>;
  currPage = 0;
  moviesPostersUrl = 'https://image.tmdb.org/t/p/w500/';

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.response$ = this.moviesService.getSimilarMovies(this.id);
  }

  onMovieClick(event: any): void {
    const id = event.target.parentElement.getAttribute('id');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['movie/' + id]);
  }

  prevMoviesPage() {
    if (this.currPage > 0) {
      this.currPage--;
      this.moveSlider();
    }
  }

  nextMoviesPage() {
    const maxPageNum = (this.similarMoviesContainer.nativeElement.children.length / 5) - 1;
    if (this.currPage < maxPageNum) {
      this.currPage++;
      this.moveSlider();
    }
  }

  moveSlider(): void {
    const size = this.similarMovies.nativeElement.clientWidth;
    this.similarMoviesContainer.nativeElement.style.transform = 'translateX(' + (-size * this.currPage) + 'px)';
  }
}