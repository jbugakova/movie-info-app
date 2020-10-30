import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

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
export class TrailersComponent {
  @Input() trailers: Trailer[];

  constructor(private sanitizer: DomSanitizer) {}

  getEmbedUrl(key: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + key);
  }
}
