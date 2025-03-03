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
  maxBrawlersQuantity = 30;

  // Variables para los brawlers
  brawlersClassified: {[key: string]: ListBrawler[]} = {
    'Inicial': [],
    'Raro': [],
    'Super Raro': [],
    'Épico': [],
    'Mítico': [],
    'Legendario': []
  }

  selectedBrawlers: number[] = [];

  rarityColors : {[key: string]: string} = {
    'Inicial': '#b9eeff',
    'Raro': '#87ff7a',
    'Super Raro': '#7abeff',
    'Épico': '#e070ff',
    'Mítico': '#fe5e72',
    'Legendario': '#fff251'
  }

  rarityDefaultProbabilities : {[key: string]: number} = {
    'Inicial': 100,
    'Raro': 70,
    'Super Raro': 40,
    'Épico': 20,
    'Mítico': 10,
    'Legendario': 5
  }

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

  toggleUnlimitedQuantity(): void {
    if (this.quantity === -1) {
      this.quantity = 0;
    } else {
      this.quantity = -1;
    }
  }

  storePreviousValue(rarity: string): void {
    this.previousDefaultProbability = this.rarityDefaultProbabilities[rarity];
  }

  convertBrawlerResponseToBrawler(brawler: ListBrawlerResponse[]): ListBrawler[] {
    return brawler.map(b => {
      return {
        ...b,
        probability: this.rarityDefaultProbabilities[b.rarity],
        showProbability: false
      }
    });
  }

        brawler.showProbability = true;
        this.selectedBrawlers.push(brawler);
      }
    }
  }

}
