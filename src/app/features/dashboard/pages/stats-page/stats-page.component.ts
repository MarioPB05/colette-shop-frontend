import {Component, ElementRef, inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {StatCard, StatCardComponent} from '@dashboard/components/stat-card/stat-card.component';
import {StatService} from '@dashboard/services/stat.service';
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

  protected dataPedidos: any;
  protected dataCajas: any;
  protected dataGemas: any;
  protected options: any;
  protected stats: any;

  private statService = inject(StatService);
  private messageService: MessageService = inject(MessageService);

  // Get all p-chart elements
  @ViewChildren('.my-chart') charts!: QueryList<ElementRef>;

  ngOnInit() {
    this.statService.getStats().subscribe({
      next: (stats) => {
        this.statCards = [{
          title: 'Cajas compradas',
          principalValue: 0,
          secondaryValue: 0,
          tertiaryValue: 0,
          icon: 'pi pi-shopping-bag text-blue-500',
          tabIcon: 'pi pi-shopping-bag',
          color: 'bg-blue-200',
          colorHex: '#60A5FA',
          rawData: stats.inventory,
          key: 'boxes',
          keyChart: 'bar',
          unit: 'cajas'
        }, {
          title: 'Ingresos totales',
          principalValue: 0,
          secondaryValue: 0,
          tertiaryValue: 0,
          icon: 'pi pi-euro text-green-500',
          tabIcon: 'pi pi-euro',
          color: 'bg-green-200',
          rawData: stats.inventory,
          key: 'totalPrice',
          keyChart: 'line',
          colorHex: '#34D399',
          unit: '€'
        }, {
          title: 'Gemas utilizadas',
          principalValue: 0,
          secondaryValue: 0,
          tertiaryValue: 0,
          icon: 'pi pi-tag text-purple-500',
          tabIcon: 'pi pi-tag',
          color: 'bg-purple-200',
          colorHex: '#9F7AEA',
          rawData: stats.gems,
          key: 'gems',
          keyChart: 'line',
          unit: 'gemas'
        }];

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        this.stats = [];

        this.statCards.forEach((card) => {
          this.renderStatCard(card);

          this.stats.push({
            key: card.key,
            type: card.keyChart,
            labels: card.rawData.map((stat: any) => new Date(stat.day).toLocaleDateString()),
            datasets: [{
              label: card.title,
              data: card.rawData.map((stat: any) => stat[card.key]),
              fill: false,
              backgroundColor: card.colorHex,
              borderColor: card.colorHex,
              tension: 0.4
            }]
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

    statCard.tertiaryValue = statCard.principalValue / statCard.rawData.length;
  }

}
