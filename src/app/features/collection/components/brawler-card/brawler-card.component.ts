import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {TrophyService} from '@shared/services/trophy.service';
import {BrawlerCardResponse} from '@models/brawler.model';
import {BrawlerService} from '@features/collection/services/brawler.service';
import {MessageService} from 'primeng/api';

type ImageType = 'portrait' | 'landscape';

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
  actualTier = 1;
  imageType: ImageType = 'portrait';

  actualTrophyCount = 10;
  actualTrophyMax = 20;

  totalTrophyCount = 10;
  totalTrophyMax = 20;

  @Input() brawler!: BrawlerCardResponse;
  @Output() favoriteChange = new EventEmitter<boolean>();

  constructor(private trophyService: TrophyService,
              private brawlerService: BrawlerService,
              private messageService: MessageService) {}

  ngOnInit() {
    const totalTrophies = this.trophyService.getTotalTrophies(this.brawler.user_quantity);
    const tier = this.trophyService.getTier(totalTrophies);

    this.actualTrophyMax = this.trophyService.getTrophiesToReachTier(tier);
    this.actualTrophyCount = this.actualTrophyMax - this.trophyService.getTrophiesToNextTier(totalTrophies);
    this.actualTier = tier;

    this.totalTrophyCount = totalTrophies;
    this.totalTrophyMax = this.trophyService.getTrophyTierCount(tier);

    this.getImageDimensions(this.brawler.model_image).then(({ width, height }) => {
      this.imageType = this.getImageTypeByDimension(width, height);
      console.log(this.imageType);
    });
  }

  getImageTypeByDimension(width: number, height: number): ImageType {
    if (width > height) {
      return 'landscape';
    }

    return 'portrait';
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
    this.setFavorite(this.brawler.user_favorite);
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

  setFavorite(favorite: boolean) {
    this.brawlerService.setBrawlerFavorite(this.brawler.id, favorite).subscribe({
      next: () => {
        this.favoriteChange.emit(favorite);
      },
      error: () => {
        this.brawler.user_favorite = !favorite;
        this.favoriteChange.emit(!favorite);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se ha podido actualizar el favorito'});
      },
    });
  }

  getImageDimensions(imageUrl: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };

      img.onerror = (error) => {
        reject(error);
      };
    });
  }
}
