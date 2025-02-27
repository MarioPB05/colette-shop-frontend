import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {TrophyService} from '@shared/services/trophy.service';
import {BrawlerCardResponse} from '@models/brawler.model';

@Component({
  selector: 'app-brawler-card',
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './brawler-card.component.html',
  standalone: true,
  styleUrl: './../../../../shared/brawl_styles.scss',
})
export class BrawlerCardComponent implements OnInit {
  brawlerQuantity = 2;
  actualTier = 1;

  actualTrophyCount = 10;
  actualTrophyMax = 20;

  totalTrophyCount = 10;
  totalTrophyMax = 20;

  @Input() brawler!: BrawlerCardResponse;

  constructor(private trophyService: TrophyService) {}

  ngOnInit() {
    const totalTrophies = this.trophyService.getTotalTrophies(this.brawler.user_quantity);
    const tier = this.trophyService.getTier(totalTrophies);

    this.actualTrophyMax = this.trophyService.getTrophiesToReachTier(tier);
    this.actualTrophyCount = this.actualTrophyMax - this.trophyService.getTrophiesToNextTier(totalTrophies);
    this.actualTier = tier;

    this.totalTrophyCount = totalTrophies;
    this.totalTrophyMax = this.trophyService.getTrophyTierCount(tier);
  }

  userUnlockedBrawler() {
    return this.brawler.user_quantity > 0;
  }

  isMaxTier(tier: number) {
    return this.trophyService.isMaxTier(tier);
  }

  getTierImage() {
    return `/images/tiers/${this.actualTier}.png`;
  }

  triggerUserFavorite() {
    this.brawler.user_favorite = !this.brawler.user_favorite;
  }

  getBrawlerNameSize() {
    if (this.brawler.name.length > 15) {
      return 'text-base';
    }

    if (this.brawler.name.length > 10) {
      return 'text-lg';
    }

    if (this.brawler.name.length > 5) {
      return 'text-xl';
    }

    return 'text-2xl';
  }
}
