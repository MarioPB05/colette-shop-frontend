import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {
  BrawlerUnlockedCardComponent
} from '@features/box-resume/components/brawler-unlocked-card/brawler-unlocked-card.component';
import {
  BrawlerDuplicateCardComponent
} from '@features/box-resume/components/brawler-duplicate-card/brawler-duplicate-card.component';
import {InventoryBrawlerResponse} from '@models/brawler.model';

interface BrawlerCard {
  id_brawler: number;
  type: 'unlocked' | 'duplicate';
}

@Component({
  selector: 'app-box-resume-page',
  imports: [
    NgIf,
    BrawlerUnlockedCardComponent,
    BrawlerDuplicateCardComponent,
    NgForOf
  ],
  templateUrl: './box-resume-page.component.html',
  styleUrl: './../../../shared/brawl_styles.scss',
})
export class BoxResumePageComponent implements OnInit {
  pageLoaded: boolean = false;
  brawlers: InventoryBrawlerResponse[]= [
    {
      id: 1,
      name: 'Shelly',
      image: '/images/brawlers/16000000_main.png',
      user_quantity_actual: 1,
      user_quantity_past: 0
    },
    {
      id: 2,
      name: 'Nita',
      image: '/images/brawlers/16000001_main.png',
      user_quantity_actual: 2,
      user_quantity_past: 1
    },
    {
      id: 3,
      name: 'Colt',
      image: '/images/brawlers/16000002_main.png',
      user_quantity_actual: 4,
      user_quantity_past: 2
    },
    {
      id: 3,
      name: 'Bull',
      image: '/images/brawlers/16000003_main.png',
      user_quantity_actual: 2,
      user_quantity_past: 0
    },
  ]
  brawlersCards: BrawlerCard[] = [];
  brawlerCardsAppearing: BrawlerCard[] = [];

  ngOnInit() {
    this.pageLoaded = true;
    this.brawlersCards = this.convertBrawlersToCards();
    console.log(this.brawlersCards);
    this.doAppearBrawlerCardsAnimation();
  }

  doAppearBrawlerCardsAnimation() {
    for (let i = 0; i < this.brawlersCards.length; i++) {
      setTimeout(() => {
        this.brawlerCardsAppearing.push(this.brawlersCards[i]);
      }, i * 1000);
    }
  }

  convertBrawlersToCards() {
    const brawlerCards: BrawlerCard[] = [];

    this.brawlers.forEach(brawler => {
      if (brawler.user_quantity_actual > 0 && brawler.user_quantity_past === 0) {
        brawlerCards.push({
          id_brawler: brawler.id,
          type: 'unlocked'
        });
      }

      if (brawler.user_quantity_actual + brawler.user_quantity_past > 1) {
        brawlerCards.push({
          id_brawler: brawler.id,
          type: 'duplicate'
        });
      }
    });

    return brawlerCards;
  }

  getBrawlerById(id: number) {
    const brawler = this.brawlers.find(brawler => brawler.id === id);
    return brawler ? brawler : this.brawlers[0];
  }

  getActualBrawlerQuantity(id: number) {
    const brawler = this.brawlers.find(brawler => brawler.id === id);
    return brawler ? brawler.user_quantity_actual - brawler.user_quantity_past : 0;
  }
}
