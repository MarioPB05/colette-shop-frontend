import {Component, inject, OnInit} from '@angular/core';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {StatCard, StatCardComponent} from '@dashboard/components/stat-card/stat-card.component';
import {StatService} from '@dashboard/services/stat.service';
import {InventoryStats} from '@models/stats.model';
import {MessageService} from 'primeng/api';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-stats-page',
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    StatCardComponent,
    NgIf
  ],
  templateUrl: './stats-page.component.html',
  styles: ``
})
export class StatsPageComponent implements OnInit {

  loadingData: boolean = true;
  protected statCards: StatCard[] = [];

  private statService = inject(StatService);
  private messageService: MessageService = inject(MessageService);

  ngOnInit() {
    this.statService.getStatBox().subscribe({
      next: (statBox) => {
        this.statCards.push(this.theStatBoxAStatCard(statBox));
        this.loadingData = false;
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo cargar los datos'});
      }
    });

  }

  theStatBoxAStatCard(statBox: InventoryStats[]): StatCard {
    let statCard: StatCard = {
      title: 'Cajas',
      principalValue: 0,
      secondaryValue: 0,
      icon: 'pi pi-shopping-bag text-blue-500',
      color: 'bg-blue-200'
    }

    let boxMonth = 0;
    let boxDay = 0;

    for (const stat of statBox) {
      boxMonth += stat.boxes;
      if (new Date(stat.day).toDateString() === new Date().toDateString()) {
        boxDay = stat.boxes;
      }
    }

    statCard.principalValue = boxMonth;
    statCard.secondaryValue = boxDay;

    return statCard;
  }

}
