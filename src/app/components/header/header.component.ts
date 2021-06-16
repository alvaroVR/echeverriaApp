import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string;
  @Input() txtBack: string;
  @Input() href: string;
  @Input() isBack: boolean = false;
  @Input() color: string = 'primary';

}
