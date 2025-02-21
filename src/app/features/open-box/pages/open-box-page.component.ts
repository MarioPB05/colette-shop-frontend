import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FaviconService} from '@core/services/favicon.service';
import {TrophyService} from '@shared/services/trophy.service';
import {UserBrawlerProbabilityResponse} from '@models/brawler.model';
import {InventoryBoxResponse} from '@models/box.model';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {RarityDetailResponse} from '@models/rarity.model';

type pageTypes = 'open-box' | 'duplicate-brawler' | 'new-brawler-mystery-spins' | 'new-brawler-unlocked';

@Component({
  selector: 'app-open-box-page',
  imports: [
    NgIf,
    NgClass,
  ],
  templateUrl: './open-box-page.component.html',
  standalone: true,
  styleUrls: ['./../../../shared/brawl_styles.scss'],
})
export class OpenBoxPageComponent implements OnInit{
  pageLoaded = false;
  flashVisible = false;
  actualPage: pageTypes = 'open-box';
  nextButtonVisible = false;
  changeItemAnimation = false;
  nextBrawlerIsNew = false;

  box: InventoryBoxResponse = {
    'id': 1,
    'type': 'big_box',
    'brawler_quantity': 10,
    'opened': false
  }

  brawlersCanGetInBox: UserBrawlerProbabilityResponse[] = [
    {
      'id': 1,
      'name': 'Shelly',
      'image': '/images/brawlers/16000000_main.png',
      'model_image': '/images/brawlers/16000000_model.png',
      'probability': 100,
      'quantity': 0,
      'rarity_id': 1,

    },
    {
      'id': 2,
      'name': 'Bull',
      'image': '/images/brawlers/16000002_main.png',
      'model_image': '/images/brawlers/16000002_model.png',
      'probability': 50,
      'quantity': 0,
      'rarity_id': 2,
    },
    {
      'id': 3,
      'name': 'Colt',
      'image': '/images/brawlers/16000001_main.png',
      'model_image': '/images/brawlers/16000001_model.png',
      'probability': 50,
      'quantity': 0,
      'rarity_id': 2,
    }
  ];
  brawlersInBox: number[] = [];
  brawlersOpened: number[] = [];

  rarities: RarityDetailResponse[] = [
    {
      'id': 1,
      'name': 'Inicial',
      'color': '#b9eeff',
      'brawlersOfRarityUnlocked': 0,
      'totalBrawlersOfRarity': 1,
    },
    {
      'id': 2,
      'name': 'Raro',
      'color': '#68fd58',
      'brawlersOfRarityUnlocked': 2,
      'totalBrawlersOfRarity': 23,
    }
  ]

  //----- DUPLICATE BRAWLER PHASE -----//
  duplicateBrawlerImage = '';
  duplicateBrawlerName = '';

  tierSize = 'h-10';
  tierContainerSize = 'w-12';
  tierBrightness = 'brightness(1)';
  trophyProgressBarColor = 'bg-gradient-to-b';

  actualTier = 1;
  trophyProgression = 25;
  actualTrophyCount = 0;
  actualTrophyMax = 0;

  totalTrophyCount = 0;
  totalTrophyMax = 0;

  //-------- NEW BRAWLER PHASE --------//
  newBrawlerAnimationDuration = 2; // in seconds
  newBrawler!: UserBrawlerProbabilityResponse;
  newBrawlerRarity!: RarityDetailResponse;
  showNewBrawlerText = false;

  constructor(private  faviconService: FaviconService,
              private trophyService: TrophyService,
              private router: Router,
              private messageService: MessageService) {}

  ngOnInit() {
    this.faviconService.changeFavicon("/images/favicon/box-favicon.png");
    this.pageLoaded = true;

    if (this.box.opened) {
      this.router.navigate(['/inventory']).then(() => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'La caja ya ha sido abierta.'});
      });
      return;
    }

    this.setBrawlersInBox();
  }

  isBrawlerDuplicate(brawler: UserBrawlerProbabilityResponse): boolean {
    return brawler.quantity > 0;
  }

  setBrawlersInBox() {
    const brawlersInBox = this.decideAllBrawlersInBox();

    if (!brawlersInBox) {
      this.router.navigate(['/inventory']).then(() => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo seleccionar ningún brawler.'});
      });
      return;
    }

    this.brawlersInBox = brawlersInBox;
    console.log(this.brawlersInBox);
  }

  decideAllBrawlersInBox() {
    const brawlers: number[] = [];

    for (let i = 0; i < this.box.brawler_quantity; i++) {
      const brawler = this.decideNextBrawlerInBox();
      if (brawler) {
        brawlers.push(brawler.id);
        continue;
      }

      return null;
    }

    return brawlers;
  }

  decideNextBrawlerInBox(): UserBrawlerProbabilityResponse | null {
    if (!this.brawlersCanGetInBox || this.brawlersCanGetInBox.length === 0) {
      console.warn("No hay brawlers disponibles en la caja.");
      return null; // Evita errores si la lista está vacía
    }

    // Calcular la suma total de probabilidades
    const totalProbability = this.brawlersCanGetInBox.reduce(
      (sum, brawler) => sum + brawler.probability,
      0
    );

    // Generar un número aleatorio dentro del rango de probabilidades
    const randomThreshold = Math.random() * totalProbability;

    let accumulatedProbability = 0;

    // Seleccionar el brawler en función de la probabilidad acumulativa
    for (const brawler of this.brawlersCanGetInBox) {
      accumulatedProbability += brawler.probability;
      if (accumulatedProbability >= randomThreshold) {
        return brawler;
      }
    }

    console.warn("No se pudo seleccionar un brawler. Verifica las probabilidades.");
    return null; // Retorno de seguridad en caso de fallo inesperado
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
      this.openNextItem();
    });
  }

  openNextItem() {
    const index = this.brawlersOpened.length;
    const brawlerIndex = this.brawlersCanGetInBox.findIndex(brawler => brawler.id === this.brawlersInBox[index]);
    const brawler = this.brawlersCanGetInBox[brawlerIndex];
    this.changeItemAnimation = true;
    console.log(brawler);

    if (this.box.brawler_quantity === this.brawlersOpened.length) {
        this.navigateToBoxResume();
        return;
    }

    if (index + 1 !== this.brawlersInBox.length) {
      const nextBrawlerIndex = this.brawlersCanGetInBox.findIndex(brawler => brawler.id === this.brawlersInBox[index + 1]);
      const nextBrawler = this.brawlersCanGetInBox[nextBrawlerIndex];
      this.nextBrawlerIsNew = !this.isBrawlerDuplicate(nextBrawler) && brawler.id !== nextBrawler.id && this.box.brawler_quantity !== this.brawlersOpened.length + 1;
    }

    setTimeout(() => {
      this.changeItemAnimation = false;
      this.nextButtonVisible = false;
    }, 50);

    if (!brawler) {
      console.warn("No hay más brawlers en la caja.");
      this.navigateToBoxResume();
      return;
    }

    if (this.isBrawlerDuplicate(brawler)) {
      this.initDuplicateBrawlerPhase(brawler);
    } else {
      this.initNewBrawlerPhase(brawler);
    }

    this.brawlersOpened.push(brawler.id);
    this.brawlersCanGetInBox[brawlerIndex].quantity++;
  }

  navigateToBoxResume() {
    this.router.navigate([`/box/${this.box.id}/resume`]);
  }

  isMaxTier(actualTier: number): boolean {
    return this.trophyService.isMaxTier(actualTier);
  }

  initDuplicateBrawlerPhase(brawler: UserBrawlerProbabilityResponse) {
    this.actualPage = 'duplicate-brawler';
    this.duplicateBrawlerImage = brawler.image;
    this.duplicateBrawlerName = brawler.name;

    const totalTrophies = this.trophyService.getTotalTrophies(brawler.quantity);
    const tier = this.trophyService.getTier(totalTrophies);

    this.actualTrophyMax = this.trophyService.getTrophiesToReachTier(tier);
    this.actualTrophyCount = this.actualTrophyMax - this.trophyService.getTrophiesToNextTier(totalTrophies);
    this.actualTier = tier;

    this.totalTrophyCount = totalTrophies;
    this.totalTrophyMax = this.trophyService.getTrophyTierCount(tier);

    if (this.isMaxTier(this.actualTier) || this.actualTier == 50) {
      this.setBiggerTierSize();
    }

    setTimeout(() => {
      this.updateTrophyCount().then(() => {
        this.nextButtonVisible = true
      });
    }, 1500);
  }

  initNewBrawlerPhase(brawler: UserBrawlerProbabilityResponse) {
    this.newBrawler = brawler;
    this.newBrawlerRarity = this.getNewBrawlerRarity();
    this.newBrawlerRarity.brawlersOfRarityUnlocked++;
    this.actualPage = 'new-brawler-mystery-spins';

    setTimeout(() => {
      this.actualPage = 'new-brawler-unlocked';
      this.nextButtonVisible = true;

    }, this.newBrawlerAnimationDuration * 1000);

    setTimeout(() => {
      this.showNewBrawlerText = true;
    }, this.newBrawlerAnimationDuration * 1000 + 500);
  }

  //----- DUPLICATE BRAWLER PHASE -----//
  setBiggerTierSize() {
    this.tierSize = 'h-12';
    this.tierContainerSize = 'w-16';
  }

  getParentActualPageClasses() {
    if (this.actualPage == 'duplicate-brawler') {
      return 'bg-gradient-radial via-brawl-purple to-brawl-purple from-purple-500';
    }

    if (this.actualPage == 'new-brawler-mystery-spins') {
      return 'bg-brawl-sky-blue';
    }

    if (this.actualPage == 'new-brawler-unlocked') {
      const rarity = this.getNewBrawlerRarity();

      if (rarity) {
          return `bg-[${rarity.color}]`;
      }

      return `bg-[${this.getNewBrawlerRarityColor()}]`;
    }

    return 'bg-gradient-radial via-brawl-dark-blue to-brawl-dark-blue from-brawl-blue';
  }

  getTierImage() {
    return `/images/tiers/${this.actualTier}.png`;
  }

  async updateTrophyCount() {
    return new Promise<void>(async (resolve) => {
      let targetCount = this.actualTrophyCount + this.trophyService.stepTrophies;

      // If the target count is higher than the actual trophy max, we need to do multiple animations until we reach the target count
      while (targetCount > this.actualTrophyMax && !this.isMaxTier(this.actualTier)) {
        await this.updateTrophyCountAnimation(this.actualTrophyMax);
        targetCount -= this.actualTrophyMax;
      }

      await this.updateTrophyCountAnimation(targetCount);
      resolve();
    });
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
          this.totalTrophyCount++;
        } else {
          clearInterval(interval);

          if (this.actualTrophyCount == this.actualTrophyMax && !this.isMaxTier(this.actualTier)) {
            await this.doNextTierAnimation().then(() => {
              resolve();
            });
          }else {
            resolve();
          }
        }
      }, animationTime);
    });
  }

  sumTier() {
    this.actualTier++;

    setTimeout(() => {
      this.totalTrophyMax = this.trophyService.getTrophyTierCount(this.actualTier);
      this.actualTrophyMax = this.trophyService.getTrophiesToReachTier(this.actualTier);

      this.actualTrophyCount = 0;
    }, 1000);
  }

  async doNextTierAnimation() {
    // Change color of the trophy progress bar and increase the tier size
    setTimeout(() => {
      this.trophyProgressBarColor = 'bg-brawl-gold';
      this.setBiggerTierSize();
    }, 100);

    // Change the tier image brightness to full white
    setTimeout(() => {
      this.tierBrightness = 'brightness(0) invert(1)';
    }, 150);

    // Increase the tier number and reset the brightness
    setTimeout(() => {
      this.sumTier();
      this.tierBrightness = 'brightness(1)';
    }, 450);


    // Reset the trophy progress bar color and decrease the tier size to the original and resolve the promise
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.tierSize = 'h-10';
        this.tierContainerSize = 'w-12';
        this.trophyProgressBarColor = 'bg-gradient-to-b';

        if (this.isMaxTier(this.actualTier) || this.actualTier == 50) {
          this.setBiggerTierSize();
        }

        resolve();
      }, 1500);
    });
  }

  //----------------- NEW BRAWLER PHASE -----------------//

  getNewBrawlerRarity(): RarityDetailResponse {
    const rarity = this.rarities.find(rarity => rarity.id === this.newBrawler.rarity_id);

    return rarity ? rarity : this.rarities[0];
  }

  getNewBrawlerRarityColor(): string {
    const rarity = this.getNewBrawlerRarity();
    return rarity ? rarity.color : '';
  }

  putRarityNameInPlural(rarityName: string): string {
    if (rarityName === 'Inicial') {
      return rarityName + 'es';
    }

    return rarityName + 's';
  }
}
