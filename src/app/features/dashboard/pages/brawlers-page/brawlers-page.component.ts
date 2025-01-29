import {Component, inject} from '@angular/core';
import {TableModule} from 'primeng/table';
import {BrawlerServiceService} from '@dashboard/services/brawler-service.service';
import {TableBrawlerResponse} from '@core/models/brawler.model';
import {Badge} from 'primeng/badge';
import colors from 'tailwindcss/colors';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-brawlers-page',
  imports: [
    TableModule,
    Badge,
    NgClass
  ],
  templateUrl: './brawlers-page.component.html',
  styles: ``
})
export class BrawlersPageComponent {

  protected brawlers: TableBrawlerResponse[] = [];
  brawlerServiceService = inject(BrawlerServiceService);

  ngOnInit(): void {
    this.brawlerServiceService.getAllBrawlers().subscribe({
      next: brawlers => {
        for (const brawler of brawlers) {
          this.brawlers.push(brawler);
        }
      },
      error: err => {
        console.error('Error al cargar los brawlers:', err);
      }
    });
  }

  getBadgeClass(rarity: string): string {
    switch (rarity) {
      case 'Inicial':
        return 'bg-[#b9eeff]';
      case 'Raro':
        return 'bg-[#68fd58]';
      case 'Super Raro':
        return 'bg-[#5ab3ff]';
      case 'Épico':
        return 'bg-[#d850ff]';
      case 'Mítico':
        return 'bg-[#fe5e72]';
      case 'Legendario':
        return 'bg-[#fff11e]';
      default:
        return '';
    }
  }

  protected readonly colors = colors;
}
