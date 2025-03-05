import {Component, inject, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {BrawlerService} from '@dashboard/services/brawler.service';
import {TableBrawlerResponse} from '@core/models/brawler.model';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-brawlers-page',
  imports: [
    TableModule,
    InputText,
    FormsModule,
    IconField,
    InputIcon
  ],
  templateUrl: './brawlers-page.component.html',
  styles: ``
})
export class BrawlersPageComponent implements OnInit {

  protected brawlers: TableBrawlerResponse[] = [];
  private brawlersFilter: TableBrawlerResponse[] = [];
  private brawlersOriginal: TableBrawlerResponse[] = [];

  private brawlerServiceService = inject(BrawlerService);
  private messageService: MessageService = inject(MessageService);

  ngOnInit(): void {
    this.brawlerServiceService.getAllBrawlers().subscribe({
      next: brawlers => {
        this.brawlers = brawlers;
        this.brawlersOriginal = brawlers;
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo cargar los brawlers'});
      }
    });
  }

  filterBrawlersForName(event: any): void {
    this.brawlersFilter = this.brawlersOriginal.filter(brawler => brawler.name.toLowerCase().includes(event.target.value.toLowerCase().trim()));
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
