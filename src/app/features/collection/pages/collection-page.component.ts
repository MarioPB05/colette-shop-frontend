import {Component, OnInit} from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrawlerCardComponent} from '@features/collection/components/brawler-card/brawler-card.component';
import {BrawlerCardResponse} from '@models/brawler.model';
import {NgForOf} from '@angular/common';
import {FaviconService} from '@core/services/favicon.service';
import {BrawlerService} from '@features/collection/services/brawler.service';

type OrderBrawlers = 'Nombre' | 'Calidad' | 'Mas trofeos' | 'Menos trofeos';

@Component({
  selector: 'app-collection-page',
  imports: [
    BrawlHeaderComponent,
    ReactiveFormsModule,
    BrawlerCardComponent,
    NgForOf,
    FormsModule
  ],
  templateUrl: './collection-page.component.html',
  standalone: true,
  styleUrl: './../../../shared/brawl_styles.scss',
})
export class CollectionPageComponent implements OnInit {
  brawlers: BrawlerCardResponse[] = [];
  blockedBrawlers: BrawlerCardResponse[] = [];
  unlockedBrawlers: BrawlerCardResponse[] = [];

  sortByFavoritesIsActive = false;

  orderBrawlersMethods: {[key in OrderBrawlers]: (a: BrawlerCardResponse, b: BrawlerCardResponse) => number} = {
    'Nombre': (a: BrawlerCardResponse, b: BrawlerCardResponse) => a.name.localeCompare(b.name),
    'Calidad': (a: BrawlerCardResponse, b: BrawlerCardResponse) => a.rarity_id - b.rarity_id,
    'Mas trofeos': (a: BrawlerCardResponse, b: BrawlerCardResponse) => b.user_quantity - a.user_quantity,
    'Menos trofeos': (a: BrawlerCardResponse, b: BrawlerCardResponse) => a.user_quantity - b.user_quantity,
  }

  actualSortMethod: OrderBrawlers = 'Nombre';

  constructor(private faviconService: FaviconService,
              private brawlerService: BrawlerService) {}

  ngOnInit() {
    this.faviconService.changeFavicon('/images/favicon/collection-favicon.png');
    this.actualSortMethod = 'Calidad';
    this.brawlerService.getUserCollection().subscribe(brawlers => {
      this.brawlers = brawlers;
      this.sortBrawlers(this.brawlers, this.actualSortMethod);
    });
  }

  classifyBrawlers() {
    this.blockedBrawlers = this.brawlers.filter(brawler => brawler.user_quantity === 0);
    this.unlockedBrawlers = this.brawlers.filter(brawler => brawler.user_quantity > 0);
  }

  sortByFavoritesChange() {
    this.sortByFavoritesIsActive = !this.sortByFavoritesIsActive;

    this.sortBrawlers(this.brawlers, this.actualSortMethod);
  }

  nextSortMethod() {
    const orderMethods = Object.keys(this.orderBrawlersMethods) as OrderBrawlers[];
    const actualIndex = orderMethods.indexOf(this.actualSortMethod);
    const nextIndex = (actualIndex + 1) % orderMethods.length;
    this.actualSortMethod = orderMethods[nextIndex];

    this.sortBrawlers(this.brawlers, this.actualSortMethod);
  }

  sortBrawlers(
    brawlers: BrawlerCardResponse[],
    orderMethod: OrderBrawlers
  ) {
    this.brawlers = brawlers.sort((a, b) => {
      // Prioridad a los favoritos
      if (b.user_favorite !== a.user_favorite && this.sortByFavoritesIsActive) {
        return b.user_favorite ? 1 : -1;
      }

      // Aplicar el método de ordenación seleccionado
      const primarySort = this.orderBrawlersMethods[orderMethod](a, b);
      if (primarySort !== 0) return primarySort; // Si hay diferencia, se usa este orden

      // Si el método seleccionado no afecta, ordenar por calidad (rarity_id)
      return a.rarity_id - b.rarity_id;
    });

    this.classifyBrawlers();
  }

  updateFavorite(brawler_id: number, favorite: boolean) {
    this.brawlers.find(brawler => brawler.id === brawler_id)!.user_favorite = favorite;
  }
}
