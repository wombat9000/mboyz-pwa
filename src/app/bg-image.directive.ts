import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[appBgImage]'
})
export class BgImageDirective implements AfterViewInit {

  private el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @Input('appBgImage') appBgImage: string;

  ngAfterViewInit() {
    this.el.style.backgroundImage = 'url(' + this.appBgImage + ')';
  }
}
