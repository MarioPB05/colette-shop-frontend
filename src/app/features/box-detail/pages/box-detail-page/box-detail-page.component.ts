import {Component, OnInit} from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {FaviconService} from '@core/services/favicon.service';
import {BrawlerProbabilityResponse} from '@models/brawler.model';
import {NgForOf, NgIf} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {ReviewComponent} from '@features/box-detail/components/review/review.component';

@Component({
  selector: 'app-box-detail-page',
  imports: [
    BrawlHeaderComponent,
    NgForOf,
    NgIf,
    Tooltip,
    ReviewComponent
  ],
  templateUrl: './box-detail-page.component.html',
  standalone: true,
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class BoxDetailPageComponent implements OnInit {
  rarities: string[] = ['Inicial', 'Común', 'Raro', 'Super Raro', 'Épico', 'Mítico', 'Legendario'];
  brawlers: BrawlerProbabilityResponse[] = [
    {
      id: 16000000,
      name: 'Shelly',
      rarity: 'Inicial',
      image: '/images/brawlers/16000000_main.png',
      probability: 98,
      userFavorite: true
    },
    {
      id: 16000001,
      name: 'Colt',
      rarity: 'Común',
      image: '/images/brawlers/16000001_main.png',
      probability: 55,
      userFavorite: false
    },
    {
      id: 16000002,
      name: 'Bull',
      rarity: 'Común',
      image: '/images/brawlers/16000002_main.png',
      probability: 30,
      userFavorite: false
    },
    {
      id: 16000003,
      name: 'Brock',
      rarity: 'Super Raro',
      image: '/images/brawlers/16000003_main.png',
      probability: 10,
      userFavorite: false
    },
    {
      id: 16000004,
      name: 'Rico',
      rarity: 'Raro',
      image: '/images/brawlers/16000004_main.png',
      probability: 5,
      userFavorite: false
    },
    {
      id: 16000005,
      name: 'Spike',
      rarity: 'Legendario',
      image: '/images/brawlers/16000005_main.png',
      probability: 2,
      userFavorite: false
    },
    {
      id: 16000006,
      name: 'Barley',
      rarity: 'Raro',
      image: '/images/brawlers/16000006_main.png',
      probability: 1,
      userFavorite: true
    },
    {
      id: 16000007,
      name: 'Jessie',
      rarity: 'Raro',
      image: '/images/brawlers/16000007_main.png',
      probability: 0.5,
      userFavorite: false
    }
  ];

  brawlersByRarity: {[key: string]: BrawlerProbabilityResponse[]} = {};

  constructor(private faviconService: FaviconService) {
  }

  ngOnInit() {
    this.faviconService.changeFavicon('/images/favicon/box-favicon.png');
    this.deleteUnusedRarities();
    this.putBrawlersByRarity();
  }

  deleteUnusedRarities() {
    this.rarities = this.rarities.filter(rarity => this.brawlers.some(brawler => brawler.rarity === rarity));
  }

  putBrawlersByRarity() {
    this.rarities.forEach(rarity => {
      this.brawlersByRarity[rarity] = this.brawlers.filter(brawler => brawler.rarity === rarity);
    });
  }
}
