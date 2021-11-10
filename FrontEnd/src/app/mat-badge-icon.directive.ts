import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMatBadgeIcon]'
})
export class MatBadgeIconDirective  implements OnInit{

  @Input() matBadgeIcon!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const badge = this.el.nativeElement.querySelector('.mat-badge-content');
    badge.style.display = 'flex';
    badge.style.alignItems = 'center';
    badge.style.justifyContent = 'center';
    badge.innerHTML = `<img class="badgeImage" src="assets/Logo.png" style="width: 50px">`;
  }

}
