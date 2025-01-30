import {Component, inject} from '@angular/core';
import {TableModule} from 'primeng/table';
import {BrawlerService} from '@dashboard/services/brawler.service';
import {TableBrawlerResponse} from '@core/models/brawler.model';
import {NgClass} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {AnimateOnScroll} from 'primeng/animateonscroll';

@Component({
  selector: 'app-brawlers-page',
  imports: [
    TableModule,
    NgClass,
    InputText,
    FormsModule,
    IconField,
    InputIcon,
    AnimateOnScroll
  ],
  templateUrl: './brawlers-page.component.html',
  styles: ``
})
export class BrawlersPageComponent {

  protected brawlers: TableBrawlerResponse[] = [];
  private brawlersFilter: TableBrawlerResponse[] = [];
  private brawlersOriginal: TableBrawlerResponse[] = [];
  brawlerServiceService = inject(BrawlerService);

  ngOnInit(): void {
    this.brawlerServiceService.getAllBrawlers().subscribe({
      next: brawlers => {
        for (const brawler of brawlers) {
          this.brawlers.push(brawler);
          this.brawlersOriginal.push(brawler);
        }
      },
      error: err => {
        console.error('Error al cargar los brawlers:', err);
      }
    });
  }

  filterBrawlersForName(event: any): void {
    this.brawlersFilter = this.brawlersOriginal.filter(brawler => brawler.name.toLowerCase().includes(event.target.value.toLowerCase()));
    this.brawlers = this.brawlersFilter;
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

}
