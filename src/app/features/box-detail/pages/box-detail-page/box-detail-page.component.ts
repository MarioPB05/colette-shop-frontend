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
  box: BoxDetailResponse = {
    id: 1,
    name: 'Caja de inicio',
    price: 30,
    type: 'Normal',
    boxesLeft: 100,
    brawlerQuantity: 3
  }
  rarities: ListRarityResponse[] = [];
  brawlers: BrawlerProbabilityResponse[] = [
    {
      id: 16000000,
      name: 'Shelly',
      rarityId: 1,
      rarity: 'Inicial',
      image: '/images/brawlers/16000000_main.png',
      probability: 98,
      userFavorite: true
    },
    {
      id: 16000001,
      name: 'Colt',
      rarityId: 2,
      rarity: 'Común',
      image: '/images/brawlers/16000001_main.png',
      probability: 55,
      userFavorite: false
    },
    {
      id: 16000002,
      name: 'Bull',
      rarityId: 2,
      rarity: 'Común',
      image: '/images/brawlers/16000002_main.png',
      probability: 30,
      userFavorite: false
    },
    {
      id: 16000003,
      name: 'Brock',
      rarityId: 4,
      rarity: 'Super Raro',
      image: '/images/brawlers/16000003_main.png',
      probability: 10,
      userFavorite: false
    },
    {
      id: 16000004,
      name: 'Rico',
      rarityId: 3,
      rarity: 'Raro',
      image: '/images/brawlers/16000004_main.png',
      probability: 5,
      userFavorite: false
    },
    {
      id: 16000005,
      name: 'Spike',
      rarityId: 6,
      rarity: 'Legendario',
      image: '/images/brawlers/16000005_main.png',
      probability: 2,
      userFavorite: false
    },
    {
      id: 16000006,
      name: 'Barley',
      rarityId: 3,
      rarity: 'Raro',
      image: '/images/brawlers/16000006_main.png',
      probability: 1,
      userFavorite: true
    },
    {
      id: 16000007,
      name: 'Jessie',
      rarityId: 3,
      rarity: 'Raro',
      image: '/images/brawlers/16000007_main.png',
      probability: 0.5,
      userFavorite: false
    }
  ];
  reviews: ReviewResponse[] = [
    {
      id: 1,
      idUser: 1,
      username: 'Javier',
      rating: 4,
      comment: 'Muy buen producto, me encantó la calidad y el precio es muy bueno. Lo recomiendo mucho.',
      post_date: '2025-01-01 12:00:00'
    },
    {
      id: 2,
      idUser: 2,
      username: 'Carlos',
      rating: 5,
      comment: 'Excelente producto, muy buena calidad y precio. Lo recomiendo mucho.',
      post_date: '2025-01-01 12:00:00'
    },
    {
      id: 3,
      idUser: 3,
      username: 'Andrea',
      rating: 3,
      comment: 'Buen producto, la calidad es buena pero el precio es un poco alto. Lo recomiendo mucho.',
      post_date: '2025-01-01 12:00:00'
    },
    {
      id: 4,
      idUser: 4,
      username: 'Luis',
      rating: 2,
      comment: 'Malo producto, la calidad es mala y el precio es muy alto. No lo recomiendo mucho.',
      post_date: '2025-01-01 12:00:00'
    },
    {
      id: 5,
      idUser: 5,
      username: 'Sofía',
      rating: 1,
      comment: 'Pésimo producto, la calidad es pésima y el precio es muy alto. No lo recomiendo mucho.',
      post_date: '2025-01-01 12:00:00'
    }
  ];
  averageRating = 0;

  brawlersByRarity: {[key: string]: BrawlerProbabilityResponse[]} = {};

  constructor(private faviconService: FaviconService) {
  }

  ngOnInit() {
    this.faviconService.changeFavicon('/images/favicon/box-favicon.png');
    this.getRarities();
    this.putBrawlersByRarity();
    this.averageRating = this.getAverageRating();
  }

  getRarities() {
    this.rarities = this.brawlers.map(brawler => {
      return {
        id: brawler.rarityId,
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
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / this.reviews.length) * 10) / 10;
  }
}
