import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-user-stat',
  imports: [],
  templateUrl: './user-stat.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class UserStatComponent {

  @Input() title!: string;
  @Input({transform: numberAttribute}) value!: number;
  @Input() icon!: string;
  @Input() color!: string;
  @Input() bgColor!: string;

  constructor() {}

}
