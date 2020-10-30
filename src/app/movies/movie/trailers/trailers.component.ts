import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';

export interface Trailer {
  name: string;
  type: string;
  key: string;
}

@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.scss']
})
export class TrailersComponent implements OnInit, AfterViewInit {
  @Input() trailers: Trailer[];
  @ViewChild('carouselItems') carouselItems: ElementRef = null;
  @ViewChild('currentTrailer') currentTrailer: ElementRef = null;
  @ViewChild('carouselContainer') carouselContainer: ElementRef;
  currIndex = 0;
  safeHtml: SafeHtml;
  private currPage = 0;

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

  constructor(private sanitizer: DomSanitizer) {}

  getEmbedUrl(key: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}`);
  }

  getYouTubeVideoThumbnail(key: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`http://i3.ytimg.com/vi/${key}/maxresdefault.jpg`);
  }

  prevTrailer() {
    if (this.currPage > 0) {
      this.currPage--;
      this.moveSlider();
    }
  }

  nextTrailer() {
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
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml('<iframe width="100%" height="500px" style="border: none" src="' + 'https://www.youtube.com/embed/' + key + '" ></iframe>');
  }

  private moveSlider() {
    const size = this.carouselContainer.nativeElement.clientWidth / 3;
    this.carouselItems.nativeElement.style.transform = 'translateX(' + (-size * this.currPage) + 'px)';
  }
}
