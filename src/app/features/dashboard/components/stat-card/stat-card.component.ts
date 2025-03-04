import {Component, HostBinding, HostListener, Input} from '@angular/core';
import {Card} from 'primeng/card';
import {NgClass} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';

export interface StatCard {
  title: string;
  principalValue: number; // el valor del mes actual
  secondaryValue: number; // el valor del día actual
  tertiaryValue: number; // el valor medio del mes actual
  icon: string;
  tabIcon: string;
  color: string;
  colorHex: string;
  rawData: any;
  key: string;
  keyChart: string;
  unit: string;
}

@Component({
  selector: 'app-stat-card',
  imports: [
    Card,
    NgClass,
    Tooltip
  ],
  templateUrl: './stat-card.component.html',
  styles: ``
})
export class StatCardComponent {
  @Input() statCard!: StatCard;
  @HostBinding('class') class = 'w-full';

  getAverageIcon(): string {
    return this.statCard.secondaryValue > this.statCard.tertiaryValue ? 'pi pi-sort-up-fill text-brawl-lime' : (this.statCard.secondaryValue < this.statCard.tertiaryValue ? 'pi pi-sort-down-fill text-brawl-red' : 'pi pi-sort text-brawl-gray');
  }

  getAverageTooltip(): string {
    return this.statCard.secondaryValue > this.statCard.tertiaryValue ? 'Superior a la media mensual' : (this.statCard.secondaryValue < this.statCard.tertiaryValue ? 'Inferior a la media mensual' : 'Igual a la media mensual');
  }

  getAverageColor(): string {
    return this.statCard.secondaryValue > this.statCard.tertiaryValue ? 'text-brawl-lime' : (this.statCard.secondaryValue < this.statCard.tertiaryValue ? 'text-brawl-red' : 'text-brawl-gray');
  }

  numberFormat(value: number): string {
    return new Intl.NumberFormat('es-ES').format(value);
  }
}
