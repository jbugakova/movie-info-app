import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

import {MoviesService} from '../../services/movies.service';
import {SimilarMovie} from '../../../environments/interface';


@Component({
  selector: 'app-similar-movie-carousel',
  templateUrl: './similar-movie-carousel.component.html',
  styleUrls: ['./similar-movie-carousel.component.scss']
})
export class SimilarMovieCarouselComponent implements OnInit {
  @Input() id: number;
  @ViewChild('similarMoviesContainer') similarMoviesContainer: ElementRef = null;
  @ViewChild('similarMovies') similarMovies: ElementRef = null;
  response$: Observable<SimilarMovie[]>;
  currPage = 0;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.response$ = this.moviesService.getSimilarMovies(this.id);
  }

  onMovieClick(event: any): void {
    const target = event.target.classList.contains('movie-item') ? event.target : event.target.parentElement;
    const id = target.getAttribute('id');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['movie/' + id]);
  }

  prevMoviesPage(): void {
    if (this.currPage > 0) {
      this.currPage--;
      this.moveSlider();
    }
  }

  nextMoviesPage(): void {
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

  getPosterUrl(posterKey: string): SafeUrl {
    if (posterKey) {
      return this.sanitizer.bypassSecurityTrustUrl('https://image.tmdb.org/t/p/w500/' + posterKey);
    } else {
      return '../../assets/images/noposter.jpg';
    }
  }
}
