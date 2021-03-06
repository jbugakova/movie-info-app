import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';

import {Trailer} from '../../../environments/interface';


@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.scss']
})
export class TrailersComponent implements OnInit, AfterViewInit {
  @Input() trailers: Trailer[];
  @ViewChild('carouselItems') carouselItems: ElementRef = null;
  @ViewChild('carouselContainer') carouselContainer: ElementRef = null;
  currIndex = 0;
  safeHtml: SafeHtml;
  private currPage = 0;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.trailers.length) {
      this.setSafeHtml();
    }
  }

  ngAfterViewInit(): void {
    if (this.trailers.length > 1) {
      this.carouselItems.nativeElement.style.width = `calc(33.3333% * ${this.trailers.length})`;
    }
  }

  getYouTubeVideoThumbnail(key: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`http://i3.ytimg.com/vi/${key}/maxresdefault.jpg`);
  }

  prevTrailer(): void {
    if (this.currPage > 0) {
      this.currPage--;
      this.moveSlider();
    }
  }

  nextTrailer(): void {
    if (this.currPage < this.trailers.length - 3) {
      this.currPage++;
      this.moveSlider();
    }
  }

  onTrailerClick(index: number): void {
    this.currIndex = index;
    this.setSafeHtml();
  }

  private setSafeHtml(): void {
    const key = this.trailers[this.currIndex].key;
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml('<iframe width="100%" height="500px" style="border: none" src="' + 'https://www.youtube.com/embed/' + key + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>');
  }

  private moveSlider(): void {
    const size = this.carouselContainer.nativeElement.clientWidth / 3;
    this.carouselItems.nativeElement.style.transform = 'translateX(' + (-size * this.currPage) + 'px)';
  }
}
