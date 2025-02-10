import {Component, inject, OnInit} from '@angular/core';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {StatCard, StatCardComponent} from '@dashboard/components/stat-card/stat-card.component';
import {StatService} from '@dashboard/services/stat.service';
import {InventoryStats} from '@models/stats.model';
import {MessageService} from 'primeng/api';
import {NgIf} from '@angular/common';
import {UIChart} from 'primeng/chart';

@Component({
  selector: 'app-stats-page',
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    StatCardComponent,
    NgIf,
    UIChart
  ],
  templateUrl: './stats-page.component.html',
  styles: ``
})
export class StatsPageComponent implements OnInit {

  loadingData: boolean = true;
  protected statCards: StatCard[] = [];

  protected data: any;
  protected options: any;

  private statService = inject(StatService);
  private messageService: MessageService = inject(MessageService);

  ngOnInit() {
    this.statService.getStats().subscribe({
      next: (stats) => {
        this.statCards = [{
          title: 'Cajas',
          principalValue: 0,
          secondaryValue: 0,
          icon: 'pi pi-shopping-bag text-blue-500',
          color: 'bg-blue-200',
          colorHex: '#60A5FA',
          rawData: stats.inventory,
          key: 'boxes',
          unit: 'cajas'
        }, {
          title: 'Precio total',
          principalValue: 0,
          secondaryValue: 0,
          icon: 'pi pi-euro text-green-500',
          color: 'bg-green-200',
          rawData: stats.inventory,
          key: 'totalPrice',
          colorHex: '#34D399',
          unit: '€'
        }, {
          title: 'Gemas',
          principalValue: 0,
          secondaryValue: 0,
          icon: 'pi pi-tag text-purple-500',
          color: 'bg-purple-200',
          colorHex: '#9F7AEA',
          rawData: stats.gems,
          key: 'gems',
          unit: 'gemas'
        }];

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        this.data = {
          labels: stats.inventory.map((stat: InventoryStats) => new Date(stat.day).toLocaleDateString()),
          datasets: []
        };

        this.statCards.forEach((card) => {
          this.renderStatCard(card);

          this.data.datasets.push({
            label: card.title,
            data: card.rawData.map((stat: any) => stat[card.key]),
            fill: false,
            borderColor: card.colorHex,
            tension: 0.4
          });
        });

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
              legend: {
                labels: {
                  color: textColor
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  color: textColorSecondary
                },
                grid: {
                  color: surfaceBorder,
                  drawBorder: false
                }
              },
              y: {
                ticks: {
                  color: textColorSecondary
                },
                grid: {
                  color: surfaceBorder,
                  drawBorder: false
                }
              }
            }
        }

        this.loadingData = false;
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo cargar los datos'});
      }
    });

  }

  renderStatCard(statCard: StatCard) {
    statCard.rawData.forEach((stat: any) => {
      statCard.principalValue += stat[statCard.key];
      if (new Date(stat.day).toDateString() === new Date().toDateString()) {
        statCard.secondaryValue = stat[statCard.key];
      }
    });
  }

}
