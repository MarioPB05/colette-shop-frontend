import {Component, ElementRef, OnInit} from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {BoxBuyCardComponent} from '@features/catalog/components/box-buy-card/box-buy-card.component';
import {Slider} from 'primeng/slider';
import {FormsModule} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import {BoxShopResponse} from '@models/box.model';
import {NgForOf, NgIf} from '@angular/common';
import {BoxService} from '@features/catalog/box.service';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-shop-page',
  imports: [BrawlHeaderComponent, Slider, FormsModule, InputNumberModule, BoxBuyCardComponent, NgForOf, NgIf, Tooltip],
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss'],
  standalone: true
})
export class CatalogPageComponent implements OnInit {
  boxTypes: string[] = ['Caja', 'Caja grande', 'Megacaja', 'Omegacaja'];
  filteredBoxTypes: string[] = ['Todos', ...this.boxTypes];

  itemsInCart: BoxShopResponse[] = [];

  rangeValues: number[] = [0, 50];
  onlyFavorites: boolean = false;
  boxTypeFilter: number = 0;

  boxesLoaded: boolean = false;
  allBoxes: BoxShopResponse[] = [
    {
      id: 1,
      name: 'Caja con todos los brawlers',
      price: 5.55,
      type: 'Caja',
      boxesLeft: -1,
      favoriteBrawlersInBox: 5,
      pinned: false,
      popular: true
    },
    {
      id: 2,
      name: 'Caja solo animales',
      price: 8.99,
      type: 'Caja grande',
      boxesLeft: -1,
      favoriteBrawlersInBox: 0,
      pinned: false,
      popular: false
    },
    {
      id: 3,
      name: 'Caja solo legendarios',
      price: 15.55,
      type: 'Megacaja',
      boxesLeft: 5,
      favoriteBrawlersInBox: 2,
      pinned: true,
      popular: false
    },
    {
      id: 4,
      name: 'Caja de los dioses',
      price: 33.69,
      type: 'Omegacaja',
      boxesLeft: 1,
      favoriteBrawlersInBox: 1,
      pinned: true,
      popular: false
    }
  ];
  boxList: BoxShopResponse[] = [];

  lastClickX: number = 0;
  lastClickY: number = 0;

  constructor(private boxService: BoxService, private elementRef: ElementRef) {
    document.addEventListener('click', (event) => {
      this.lastClickX = event.clientX;
      this.lastClickY = event.clientY;
    });
  }

  ngOnInit() {
    // this.boxService.getShopBoxes().subscribe((boxes: BoxShopResponse[]) => {
    //   this.boxList = boxes;
    // });

    this.boxList = this.allBoxes;
    this.boxList = this.boxList.sort((a, b) => a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1);
    this.filterBoxes();
    this.boxesLoaded = true;
  }

  addToCartAnimation() {
    // Obtener la imagen de plantilla
    const template = this.elementRef.nativeElement.querySelector('#add-to-cart-animation-template');

    if (!template) return;

    // Crear una copia del icono
    const clone = template.cloneNode(true) as HTMLImageElement;
    clone.style.display = 'block';
    clone.classList.add('animated-item');

    // Usar la última posición del cursor
    clone.style.left = `${this.lastClickX}px`;
    clone.style.top = `${this.lastClickY}px`;

    // Agregar el clon al body
    document.body.appendChild(clone);

    // Obtener la posición del carrito
    const cartIcon = this.elementRef.nativeElement.querySelector('#cart-icon');
    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();

      // Calcular distancia al carrito
      const deltaX = cartRect.left - this.lastClickX;
      const deltaY = cartRect.top - this.lastClickY;

      // Aplicar variables CSS para animación
      clone.style.setProperty('--x', `${deltaX}px`);
      clone.style.setProperty('--y', `${deltaY}px`);
    }

    // Eliminar la imagen después de la animación
    clone.addEventListener('animationend', () => clone.remove());
  }

  addBoxToCart(box: BoxShopResponse) {
    setTimeout(() => {
      this.addToCartAnimation();
    }, 1);

    setTimeout(() => {
      this.itemsInCart.push(box);
    }, 900);

  }

  filterBoxes() {
    let filterBoxes = this.allBoxes.filter((box) => {
      return (!this.onlyFavorites || box.favoriteBrawlersInBox > 0)
        && (this.boxTypeFilter === 0 || box.type === this.boxTypes[this.boxTypeFilter - 1])
        && (box.price >= this.rangeValues[0] && box.price <= this.rangeValues[1]);
    });

    filterBoxes = filterBoxes.sort((a, b) => a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1);
    this.boxList = [...filterBoxes];
  }

  onBoxTypeClick() {
    this.boxTypeFilter += 1;
    if (this.boxTypeFilter >= this.filteredBoxTypes.length) {
      this.boxTypeFilter = 0;
    }
    this.filterBoxes();
  }

  extractOnlyNumbers(str: string): number {
    const cleanedStr = str.replace(/(?<=\d)[.,](?=\d{3}(?:[.,]|$))/g, "");
    const normalizedStr = cleanedStr.replace(/[,\.](?=\d{1,2}$)/, ".");
    const num = parseFloat(normalizedStr);
    return isNaN(num) ? 0 : num;
  }

  swapSliderValues() {
    const temp = this.rangeValues[0];
    this.rangeValues[0] = this.rangeValues[1];
    this.rangeValues[1] = temp;
    this.rangeValues = [...this.rangeValues];
  }

  minPriceChange($event: KeyboardEvent) {
    const value = this.extractOnlyNumbers(($event.target as HTMLInputElement).value);

    if (value > 50) {
      this.rangeValues[0] = 50;
    }else {
      this.rangeValues[0] = value;
    }

    if (this.rangeValues[0] > this.rangeValues[1]) {
      this.swapSliderValues();
    }

    this.rangeValues = [...this.rangeValues];
    this.filterBoxes();
  }

  maxPriceChange($event: KeyboardEvent) {
    const value = this.extractOnlyNumbers(($event.target as HTMLInputElement).value);

    if (value > 50) {
      this.rangeValues[1] = 50;
    }else {
      this.rangeValues[1] = value;
    }

    if (this.rangeValues[0] > this.rangeValues[1]) {
      this.swapSliderValues();
    }

    this.rangeValues = [...this.rangeValues];
    this.filterBoxes();
  }
}
