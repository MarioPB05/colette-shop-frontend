import {Component, Input} from '@angular/core';
import {Card} from 'primeng/card';

export interface StatCard {
  title: string;
  principalValue: number;
  secondaryValue: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-stat-card',
  imports: [
    Card
  ],
  templateUrl: './stat-card.component.html',
  styles: ``
})
export class StatCardComponent {
  @Input() statCard!: StatCard;
}
