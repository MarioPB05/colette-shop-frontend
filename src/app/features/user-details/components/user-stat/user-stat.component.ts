import {Component, Input} from '@angular/core';

export interface UserStatCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
}

@Component({
  selector: 'app-user-stat',
  imports: [],
  templateUrl: './user-stat.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class UserStatComponent {

  // @Input() card!: UserStatCard;

  constructor() {}

}
