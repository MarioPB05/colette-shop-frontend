import {Component, HostBinding, HostListener, Input} from '@angular/core';
import {Card} from 'primeng/card';
import {NgClass} from '@angular/common';

export interface StatCard {
  title: string;
  principalValue: number;
  secondaryValue: number;
  icon: string;
  color: string;
  colorHex: string;
  rawData: any;
  key: string;
  unit: string;
}

@Component({
  selector: 'app-stat-card',
  imports: [
    Card,
    NgClass
  ],
  templateUrl: './stat-card.component.html',
  styles: ``
})
export class StatCardComponent {
  @Input() statCard!: StatCard;
  @HostBinding('class') class = 'w-full';
}
