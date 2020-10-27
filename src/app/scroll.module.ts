import {Router, Scroll} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {delay, filter} from 'rxjs/operators';
import {NgModule} from '@angular/core';

@NgModule()
export class ScrollModule {
  constructor(router: Router, viewportScroller: ViewportScroller) {
    router.events.pipe(
      filter((e): e is Scroll => e instanceof Scroll),
      delay(200)
    ).subscribe(e => {
      if (e.position) {
        viewportScroller.scrollToPosition(e.position);
      } else if (e.anchor) {
        viewportScroller.scrollToAnchor(e.anchor);
      } else {
        viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
