import {Injectable} from '@angular/core';
import {TrophiesToGetTier, TrophiesToReachTier} from '@core/enums/trophy.enum';

@Injectable({
  providedIn: 'root'
})
export class TrophyService {
  stepTrophies = 25;

  getTotalTrophies(brawlerQuantity: number) {
    // Obtener los trofeos totales basados en la cantidad de brawlers
    brawlerQuantity--;

    return brawlerQuantity * this.stepTrophies;
  }

  getTrophiesToNextTier(trophies: number) {
    // Obtener los trofeos necesarios para llegar al siguiente rango
    const tier = this.getTier(trophies);

    if (this.isMaxTier(tier)) {
      return 0;
    }

    return this.getTrophyTierCount(tier) - trophies;
  }

  getTier(trophies: number) {
    // Obtener el rango en el que se encuentra el usuario según sus trofeos
    let tier = 1;

    while (trophies >= this.getTrophyTierCount(tier)) {
      tier++;
    }

    return tier;
  }

  getTrophyTierCount(tier: number) {
    // Obtener el total de trofeos necesarios para llegar a un rango
    return TrophiesToGetTier[tier - 1];
  }

  getTrophiesToReachTier(tier: number) {
    // Obtener los trofeos necesarios para subir a ese rango
    return TrophiesToReachTier[tier - 1];
  }

  isMaxTier(tier: number) {
    return tier > 50;
  }
}
