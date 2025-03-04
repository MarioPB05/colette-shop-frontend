import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {ListBrawlerResponse, SelectedBrawler} from '@models/brawler.model';
import {BrawlerService} from '@dashboard/services/brawler.service';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {BoxTypeImages, BoxTypes} from '@core/enums/box.enum';
import {Select} from 'primeng/select';
import {CreateBoxRequest, CreateDailyBoxRequest} from '@models/box.model';
import {BoxService} from '@dashboard/services/box.service';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

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
    NgClass,
    ReactiveFormsModule,
    ProgressSpinnerModule
  ],
  templateUrl: './box-editor-page.component.html',
  styleUrl: '../../../../shared/brawl_styles.scss'
})
export class BoxEditorPageComponent {
  protected readonly BoxTypeImages = BoxTypeImages;
  protected readonly BoxTypes = BoxTypes;

  boxId!: number;
  editMode = false;
  previousDefaultProbability = 0; // Se usa para actualizar la probabilidad de los brawlers
  isDailyBox = false;
  backendIsLoading = false;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)]}),
    price: new FormControl(0, {validators: [Validators.required, Validators.min(0)]}),
    type: new FormControl(0, {validators: [Validators.required]}),
    quantity: new FormControl(0, {validators: [Validators.required, Validators.min(0)]}),
    brawler_quantity: new FormControl(1, {validators: [Validators.required, Validators.min(1)]}),
    repeat_hours: new FormControl(24, {validators: [Validators.required, Validators.min(1)]})
  });


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
  selectTypes: {label: string, value: number}[] = [];

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
    'Super Raro': 50,
    'Épico': 30,
    'Mítico': 10,
    'Legendario': 5
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private brawlerService: BrawlerService,
    private messageService: MessageService,
    private boxService: BoxService
  ) {
    this.editMode = this.router.url.includes('edit') && this.route.snapshot.paramMap.has('id');
    this.boxId = Number(this.route.snapshot.paramMap.get('id'));

    this.brawlerService.getAllBrawlersForBoxEditor().subscribe({
      next: brawlers => {
        this.brawlersClassified = this.classifyBrawlers(this.convertBrawlerResponseToBrawler(brawlers));
        this.initSelectTypes();
      },
      error: () => router.navigate(['/dashboard/boxes']).then(
        () => this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los brawlers'})
      )
    });
  }

  initSelectTypes(): void {
    this.selectTypes = BoxTypes.map((key, index) => {
      return {
        label: key,
        value: index
      }
    });
  }

  getBoxName(): string {
    return this.formGroup.get('name')?.value;
  }

  getBoxType(): number {
    return this.formGroup.get('type')?.value;
  }

  getBoxTypeImage(): string {
    return BoxTypeImages[this.BoxTypes[this.getBoxType()]];
  }

  getBoxQuantity(): number {
    return this.formGroup.get('quantity')?.value;
  }

  getSendButtonText(): string {
    if (this.backendIsLoading) {
      return this.editMode ? 'Guardando cambios...' : 'Creando caja...';
    }

    return this.editMode ? 'Guardar cambios' : 'Crear caja';
  }

  getDailyBoxButtonText(): string {
    return !this.isDailyBox ? 'Caja recurrente' : 'Caja normal';
  }

  formFieldHasError(field: string): boolean {
    const control = this.formGroup?.get(field);
    if (!control) {
      return false;
    }

    return control.invalid;
  }

  changeFormToDailyBox(): void {
    this.formGroup.get('price')?.setValue(0);
    this.formGroup.get('price')?.disable();
    this.formGroup.get('quantity')?.setValue(-1);
    this.formGroup.get('quantity')?.disable();
  }

  changeFormToNormalBox(): void {
    this.formGroup.get('price')?.enable();
    this.formGroup.get('quantity')?.enable();
    this.formGroup.get('quantity')?.setValue(0);
  }

  toggleDailyBox(): void {
    this.isDailyBox = !this.isDailyBox;
    this.isDailyBox ? this.changeFormToDailyBox() : this.changeFormToNormalBox();

    // scroll smoothly to the top of the page
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  toggleUnlimitedQuantity(): void {
    if (this.formGroup.get('quantity')?.disabled) {
      this.formGroup.get('quantity')?.setValue(0);
      this.formGroup.get('quantity')?.enable();
    } else {
      this.formGroup.get('quantity')?.setValue(-1);
      this.formGroup.get('quantity')?.disable();
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

  findBrawlerById(id: number): ListBrawler | undefined {
    return Object.values(this.brawlersClassified).flat().find(b => b.id === id);
  }

  convertSelectedBrawlersToObjects(): SelectedBrawler[] {
    return this.selectedBrawlers.map(id => {
      const brawler = this.findBrawlerById(id)!;
      return {
        id,
        probability: brawler.probability
      }
    });
  }

  convertFormToBoxRequest(): CreateBoxRequest {
    return {
      name: this.getBoxName(),
      price: this.formGroup.get('price')?.value,
      type: this.getBoxType(),
      quantity: this.formGroup.get('quantity')?.value,
      brawler_quantity: this.formGroup.get('brawler_quantity')?.value,
      brawlers_in_box: this.convertSelectedBrawlersToObjects()
    }
  }

  convertFormToDailyBoxRequest(): CreateDailyBoxRequest {
    return {
      name: this.getBoxName(),
      type: this.getBoxType(),
      repeat_every_hours: this.formGroup.get('repeat_hours')?.value,
      brawler_quantity: this.formGroup.get('brawler_quantity')?.value,
      brawlers_in_box: this.convertSelectedBrawlersToObjects()
    }
  }

  saveBox(): void {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();

    if (this.formGroup.invalid) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Por favor, rellena los campos correctamente'});
      return;
    }

    if (this.selectedBrawlers.length === 0) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Selecciona al menos un brawler en la sección de contenido'});
      return;
    }

    this.backendIsLoading = true;

    if (this.isDailyBox) {
      this.createDailyBox();
    } else {
      this.createNormalBox();
    }
  }

  throwCreateBoxError(): void {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo crear la caja'});
  }

  createNormalBox(): void {
    this.boxService.createBox(this.convertFormToBoxRequest()).subscribe({
      next: (response) => {
        this.backendIsLoading = false;

        if (response.status === 'error') {
          return this.throwCreateBoxError();
        }

        this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Caja creada correctamente'});
        this.router.navigate(['/dashboard/boxes']);
      },
      error: () => {
        this.throwCreateBoxError();
        this.backendIsLoading = false;
      }
    });
  }

  createDailyBox(): void {
    this.boxService.createDailyBox(this.convertFormToDailyBoxRequest()).subscribe({
      next: (response) => {
        this.backendIsLoading = false;

        if (response.status === 'error') {
          return this.throwCreateBoxError();
        }

        this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Caja creada correctamente'});
        this.router.navigate(['/dashboard/boxes']);
      },
      error: () => {
        this.throwCreateBoxError();
        this.backendIsLoading = false;
      }
    });
  }
}
