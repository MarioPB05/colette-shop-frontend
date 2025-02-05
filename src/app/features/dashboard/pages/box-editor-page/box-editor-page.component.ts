import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {ListBrawlerResponse} from '@models/brawler.model';
import {BrawlerService} from '@dashboard/services/brawler.service';
import {MessageService} from 'primeng/api';
import {NgClass, NgForOf} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {FormsModule} from '@angular/forms';

interface ListBrawler extends ListBrawlerResponse {
  probability: number;
  showProbability: boolean;
}

@Component({
  selector: 'app-box-editor',
  imports: [
    InputText,
    InputNumber,
    NgForOf,
    Tooltip,
    FormsModule,
    NgClass
  ],
  templateUrl: './box-editor-page.component.html'
})
export class BoxEditorPageComponent {
  boxId!: number;
  editMode = false;

  // Variables para la configuración de la caja
  maxBrawlersQuantity = 4;

  // Variables para los brawlers
  brawlersClassified: {label: string, brawlers: ListBrawler[]}[] = [
    {label: 'Inicial', brawlers: []},
    {label: 'Raro', brawlers: []},
    {label: 'Super Raro', brawlers: []},
    {label: 'Épico', brawlers: []},
    {label: 'Mítico', brawlers: []},
    {label: 'Legendario', brawlers: []}
  ];
  selectedBrawlers: ListBrawler[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private brawlerService: BrawlerService,
    private messageService: MessageService
  ) {
    this.editMode = this.router.url.includes('edit') && this.route.snapshot.paramMap.has('id');
    this.boxId = Number(this.route.snapshot.paramMap.get('id'));

    this.brawlerService.getAllBrawlersForBoxEditor().subscribe({
      next: brawlers => {
        this.brawlersClassified.forEach(classification => {
          classification.brawlers = brawlers.filter(brawler => brawler.rarity === classification.label).map(brawler => {
            return {
              ...brawler,
              probability: 0,
              showProbability: false
            }
          })
        });
      },
      error: () => router.navigate(['/dashboard/boxes']).then(
        () => this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los brawlers'})
      )
    });
  }

  toggleBrawler(event: Event, brawler: ListBrawler): void {
    const brawlerElement = event.currentTarget as HTMLElement;
    const imageCover = brawlerElement.querySelector('.image-cover');

    if (imageCover) {
      if (imageCover.classList.contains('opacity-0')) {
        // Quitar brawler de la lista
        imageCover.classList.remove('opacity-0');
        imageCover.classList.add('opacity-60');

        brawler.showProbability = false;
        this.selectedBrawlers = this.selectedBrawlers.filter(selectedBrawler => selectedBrawler.id !== brawler.id);
      }else {
        // Añadir brawler a la lista
        imageCover.classList.remove('opacity-60');
        imageCover.classList.add('opacity-0');

        brawler.showProbability = true;
        this.selectedBrawlers.push(brawler);
      }
    }
  }

}
