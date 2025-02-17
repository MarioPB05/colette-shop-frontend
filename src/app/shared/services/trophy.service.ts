import {Injectable} from '@angular/core';
import {TrophiesToGetTier, TrophiesToReachTier} from '@core/enums/trophy.enum';

@Injectable({
  providedIn: 'root'
})
export class TrophyService {
  stepTrophies = 25;

  getTotalTrophies(brawlerQuantity: number) {
    brawlerQuantity--;

    return brawlerQuantity * this.stepTrophies;
  }

  getTrophiesToNextTier(trophies: number) {
    const tier = this.getTier(trophies) - 1;

    if (this.isMaxTier(tier)) {
      return 0;
    }

    if (tier === 0) {
      return 0;
    }

    return trophies - this.getTrophyTierCount(tier + 1);
  }

  getTier(trophies: number) {
    return TrophiesToGetTier.reduce((maxIndex, total, index) =>
      total <= trophies ? index : maxIndex, 0) + 1;
  }

  getTrophyTierCount(tier: number) {
    return TrophiesToGetTier[tier - 1];
  }

  getTrophiesToReachTier(tier: number) {
    return TrophiesToReachTier[tier - 1];
  }

  isMaxTier(tier: number) {
    return tier > 50;
  }
}
