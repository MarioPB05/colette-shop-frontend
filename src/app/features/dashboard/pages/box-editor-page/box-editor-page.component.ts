import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {ListBrawlerResponse} from '@models/brawler.model';
import {BrawlerService} from '@dashboard/services/brawler.service';
import {MessageService} from 'primeng/api';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {FormsModule} from '@angular/forms';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {BoxTypeImages, BoxTypes} from '@core/enums/box.enum';
import {Select} from 'primeng/select';

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
    ToggleSwitch,
    Select,
    NgIf,
    NgClass
  ],
  templateUrl: './box-editor-page.component.html',
  styleUrl: '../../../../shared/brawl_styles.scss'
})
export class BoxEditorPageComponent {
  protected readonly BoxTypeImages = BoxTypeImages;
  protected readonly BoxTypes = BoxTypes;

  boxId!: number;
  editMode = false;
  previousDefaultProbability = 0;

  name = '';
  price = 0;
  type = BoxTypes[0];
  quantity = 0;
  brawler_quantity = 0;


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
        this.brawlersClassified = this.classifyBrawlers(this.convertBrawlerResponseToBrawler(brawlers));
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

  getRarities(): string[] {
    return Object.keys(this.brawlersClassified);
  }

  classifyBrawlers(brawlers: ListBrawler[]): {[key: string]: ListBrawler[]} {
    return brawlers.reduce((acc, brawler) => {
      acc[brawler.rarity].push(brawler);
      return acc;
    }, this.brawlersClassified);
  }

  toggleBrawler(brawler: ListBrawler): void {
    if (this.selectedBrawlers.includes(brawler.id)) {
      this.selectedBrawlers = this.selectedBrawlers.filter(id => id !== brawler.id);
      this.brawlersClassified[brawler.rarity].find(b => b.id === brawler.id)!.showProbability = false;
      return;
    }

    this.selectedBrawlers.push(brawler.id);
    this.brawlersClassified[brawler.rarity].find(b => b.id === brawler.id)!.showProbability = true;
  }

  activateAllBrawlersFromRarity(rarity: string): void {
    this.brawlersClassified[rarity].forEach(b => {
      if (this.selectedBrawlers.includes(b.id)) {
        return;
      }

      this.selectedBrawlers.push(b.id);
      b.showProbability = true;
    });
  }

  deactivateAllBrawlersFromRarity(rarity: string): void {
    this.brawlersClassified[rarity].forEach(b => {
      this.selectedBrawlers = this.selectedBrawlers.filter(id => id !== b.id);
      b.showProbability = false;
    });
  }

  getProbabilityMaxLength(probability: number): number {
    if (!probability) {
      return 3;
    }

    const probabilityString = probability.toString();

    if (probabilityString[0] !== '1') {
      return 2;
    }

    if (probabilityString[1] !== '0') {
      return 2;
    }

    return 3;
  }

  defaultProbabilityChange(rarity: string): void {
    if (this.rarityDefaultProbabilities[rarity] > 100) {
      this.rarityDefaultProbabilities[rarity] = 100;
    }

    this.brawlersClassified[rarity].forEach(b => {
      if (b.probability === this.previousDefaultProbability) {
        b.probability = this.rarityDefaultProbabilities[rarity];
      }
    });

    this.storePreviousValue(rarity);
  }
}
