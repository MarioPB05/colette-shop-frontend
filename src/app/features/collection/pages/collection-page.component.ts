import {Component, OnInit} from '@angular/core';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrawlerCardComponent} from '@features/collection/components/brawler-card/brawler-card.component';
import {BrawlerCardResponse} from '@models/brawler.model';
import {NgForOf} from '@angular/common';
import {FaviconService} from '@core/services/favicon.service';

@Component({
  selector: 'app-collection-page',
  imports: [
    BrawlHeaderComponent,
    ReactiveFormsModule,
    BrawlerCardComponent,
    NgForOf
  ],
  templateUrl: './collection-page.component.html',
  standalone: true,
  styleUrl: './../../../shared/brawl_styles.scss',
})
export class CollectionPageComponent implements OnInit {
  brawlers: BrawlerCardResponse[] = [
    {
      id: 16000001,
      name: 'COlt',
      model_image: '/images/brawlers/16000001_model.png',
      rarity_id: 2,
      rarity_name: 'rare',
      rarity_color: '#88F738',
      user_quantity: 0,
      user_favorite: true
    },
    {
      id: 16000002,
      name: 'Bull',
      model_image: '/images/brawlers/16000002_model.png',
      rarity_id: 2,
      rarity_name: 'rare',
      rarity_color: '#88F738',
      user_quantity: 1,
      user_favorite: false
    },
    {
      id: 16000000,
      name: 'Shelly',
      model_image: '/images/brawlers/16000000_model.png',
      rarity_id: 1,
      rarity_name: 'common',
      rarity_color: '#7eceff',
      user_quantity: 3,
      user_favorite: false
    }
  ]
  blockedBrawlers: BrawlerCardResponse[] = [];
  unlockedBrawlers: BrawlerCardResponse[] = [];

  constructor(private faviconService: FaviconService) {}

  ngOnInit() {
    this.faviconService.changeFavicon('/images/favicon/collection-favicon.png');
    this.classifyBrawlers();
  }

  classifyBrawlers() {
    this.blockedBrawlers = this.brawlers.filter(brawler => brawler.user_quantity === 0);
    this.unlockedBrawlers = this.brawlers.filter(brawler => brawler.user_quantity > 0);
  }

}
