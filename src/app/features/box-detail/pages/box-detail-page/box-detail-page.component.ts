import {Component, OnInit} from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {FaviconService} from '@core/services/favicon.service';
import {BrawlerProbabilityResponse} from '@models/brawler.model';
import {NgForOf, NgIf} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {ReviewComponent} from '@features/box-detail/components/review/review.component';
import {CartBtnComponent} from '@shared/components/cart-btn/cart-btn.component';
import {ListRarityResponse} from '@models/rarity.model';
import {BoxDetailResponse} from '@models/box.model';
import {ReviewResponse} from '@models/review.model';
import {ReviewService} from '@features/box-detail/services/review.service';
import {forkJoin} from 'rxjs';
import {BoxService} from '@features/box-detail/services/box.service';
import {BrawlerService} from '@features/box-detail/services/brawler.service';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-box-detail-page',
  imports: [
    BrawlHeaderComponent,
    NgForOf,
    NgIf,
    Tooltip,
    ReviewComponent,
    CartBtnComponent
  ],
  templateUrl: './box-detail-page.component.html',
  standalone: true,
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class BoxDetailPageComponent implements OnInit {
  boxId: number = 1;
  box: BoxDetailResponse = {
    id: 1,
    name: 'Cargando...',
    price: 0,
    type: 'Caja',
    boxes_left: 0,
    brawler_quantity: 0,
    is_daily: false
  }
  rarities: ListRarityResponse[] = [];
  brawlers: BrawlerProbabilityResponse[] = [];
  showReviews: ReviewResponse[] = [];
  allReviews: ReviewResponse[] = [];
  averageRating = 0;
  brawlersByRarity: {[key: string]: BrawlerProbabilityResponse[]} = {};
  lastReviewIsHovered = false;

  constructor(private faviconService: FaviconService,
              private reviewService: ReviewService,
              private boxService: BoxService,
              private brawlerService: BrawlerService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService) {}

  ngOnInit() {
    this.faviconService.changeFavicon('/images/favicon/box-favicon.png');
    this.boxId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0');

    if (this.boxId === 0) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se ha encontrado la caja'});
      return;
    }

    forkJoin({
      box: this.boxService.getBoxDetails(this.boxId),
      brawlers: this.brawlerService.getBrawlersProbabilityFromBox(this.boxId),
      reviews: this.reviewService.getReviewsFromBox(this.boxId)
    }).subscribe({ next: ({box, brawlers, reviews}) => {
      this.box = box;
      this.brawlers = brawlers;
      this.allReviews = reviews;
      this.getRarities();
      this.putBrawlersByRarity();
      this.averageRating = this.getAverageRating();
      this.showReviews = this.allReviews.slice(0, 3);
    }, error: (error) => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los datos de la caja'});
    }});
  }

  goHome() {
    window.location.href = '/';
  }

  getRarities() {
    this.rarities = this.brawlers.map(brawler => {
      return {
        id: brawler.rarity_id,
        name: brawler.rarity
      }
    });
    this.rarities = this.rarities.filter((rarity, index, self) => self.findIndex(t => t.id === rarity.id) === index);
    this.rarities.sort((a, b) => a.id - b.id);
  }

  putBrawlersByRarity() {
    this.rarities.forEach(rarity => {
      this.brawlersByRarity[rarity.name] = this.brawlers.filter(brawler => brawler.rarity === rarity.name);
    });
  }

  getAverageRating() {
    const sum = this.allReviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / this.allReviews.length) * 10) / 10;
  }

  showMoreReviews() {
    if (this.showReviews.length + 3 < this.allReviews.length) {
      this.showReviews = this.allReviews.slice(0, this.showReviews.length + 3);
    }else {
      this.showReviews = this.allReviews;
    }
  }

  onReviewHover(isLast: boolean, state: boolean) {
    if (isLast) {
      this.lastReviewIsHovered = state;
    }
  }
}
