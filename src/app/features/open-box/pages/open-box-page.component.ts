import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {FaviconService} from '@core/services/favicon.service';

type pageTypes = 'open-box' | 'duplicate-brawler' | 'new-brawler-unlocked';

@Component({
  selector: 'app-open-box-page',
  imports: [
    NgIf
  ],
  templateUrl: './open-box-page.component.html',
  standalone: true,
  styleUrls: ['./../../../shared/brawl_styles.scss'],
})
export class OpenBoxPageComponent implements OnInit{
  pageLoaded = false;
  flashVisible = false;
  actualPage: pageTypes = 'open-box';

  trophyProgression = 25;

  tierSize = 'h-10';
  tierContainerSize = 'w-12';
  tierBrightness = 'brightness(1)';
  trophyProgressBarColor = 'bg-gradient-to-b';

  actualTrophyCount = 0;
  actualTrophyMax = 15;
  actualTier = 1;

  constructor(private  faviconService: FaviconService) {}

  ngOnInit() {
    this.faviconService.changeFavicon("/images/favicon/box-favicon.png");
    this.pageLoaded = true;
  }

  showFlash(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.flashVisible = true;
      setTimeout(() => {
        resolve();
      }, 300);
    })
  }

  openBox() {
    this.showFlash().then(() => {
      this.initDuplicateBrawlerPhase();
    });
  }

  initDuplicateBrawlerPhase() {
    this.actualPage = 'duplicate-brawler';

    setTimeout(() => {
      this.updateTrophyCount();
    }, 1500);
  }

  getParentActualPageClasses() {
    if (this.actualPage == 'duplicate-brawler') {
      return 'bg-gradient-radial via-brawl-purple to-brawl-purple from-purple-500';
    }

    return 'bg-gradient-radial via-brawl-dark-blue to-brawl-dark-blue from-brawl-blue';
  }

  getTierImage() {
    return `/images/tiers/${this.actualTier}.png`;
  }

  async updateTrophyCount() {
    let targetCount = this.actualTrophyCount + this.trophyProgression;

    // If the target count is higher than the actual trophy max, we need to do multiple animations until we reach the target count
    while (targetCount > this.actualTrophyMax) {
      await this.updateTrophyCountAnimation(this.actualTrophyMax);
      targetCount -= this.actualTrophyMax;
    }

    await this.updateTrophyCountAnimation(targetCount);
  }

  async updateTrophyCountAnimation(targetCount: number): Promise<void> {
    let animationTime = 25;

    if (targetCount - this.actualTrophyCount > 40) {
      animationTime = 10;
    }

    return new Promise((resolve) => {
      let interval = setInterval(async () => {
        if (this.actualTrophyCount < targetCount) {
          this.actualTrophyCount++;
        } else {
          clearInterval(interval);

          if (this.actualTrophyCount == this.actualTrophyMax) {
            await this.doNextTierAnimation().then(() => {
              this.actualTrophyCount = 0;
              resolve();
            });
          }
        }
      }, animationTime);
    });
  }

  async doNextTierAnimation() {
    // Change color of the trophy progress bar and increase the tier size
    setTimeout(() => {
      this.trophyProgressBarColor = 'bg-brawl-gold';
      this.tierSize = 'h-12';
      this.tierContainerSize = 'w-16';
    }, 100);

    // Change the tier image brightness to full white
    setTimeout(() => {
      this.tierBrightness = 'brightness(0) invert(1)';
    }, 150);

    // Increase the tier number and reset the brightness
    setTimeout(() => {
      this.actualTier++;
      this.tierBrightness = 'brightness(1)';
    }, 450);


    // Reset the trophy progress bar color and decrease the tier size to the original and resolve the promise
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.tierSize = 'h-10';
        this.tierContainerSize = 'w-12';
        this.trophyProgressBarColor = 'bg-gradient-to-b';

        resolve();
      }, 1500);
    });
  }

}
