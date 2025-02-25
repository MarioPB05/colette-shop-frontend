import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FaviconService} from '@core/services/favicon.service';
import {TrophyService} from '@shared/services/trophy.service';
import {UserBrawlerProbabilityResponse} from '@models/brawler.model';
import {InventoryBoxResponse} from '@models/box.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {RarityDetailResponse} from '@models/rarity.model';
import {InventoryService} from '@features/open-box/services/inventory.service';
import {BrawlerService} from '@features/open-box/services/brawler.service';
import {forkJoin} from 'rxjs';
import {BoxTypeImages} from '@core/enums/box.enum';
import {RarityService} from '@features/open-box/services/rarity.service';

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

  box!: InventoryBoxResponse;

  brawlersCanGetInBox!: UserBrawlerProbabilityResponse[];
  brawlersInBox: number[] = [];
  brawlersOpened: number[] = [];

  rarities: RarityDetailResponse[] = [];

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
  rarityUnlockedSounds: {[key: number]: string} = {
    1: '/audios/brawler-reveal/common.ogg',
    2: '/audios/brawler-reveal/rare.ogg',
    3: '/audios/brawler-reveal/rare.ogg',
    4: '/audios/brawler-reveal/epic.ogg',
    5: '/audios/brawler-reveal/epic.ogg',
    6: '/audios/brawler-reveal/legendary.ogg',
  }

  constructor(private  faviconService: FaviconService,
              private trophyService: TrophyService,
              private router: Router,
              private messageService: MessageService,
              private inventoryService: InventoryService,
              private brawlerService: BrawlerService,
              private rarityService: RarityService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.faviconService.changeFavicon("/images/favicon/box-favicon.png");

    const item_id = this.route.snapshot.params['item_id'];
    forkJoin({
      box: this.inventoryService.getInventoryBox(item_id),
      rarities: this.rarityService.getAllRarityDetails(),
    }).subscribe({
      next: ({box, rarities}) => {
        this.box = box;
        this.rarities = rarities;
        this.loadBrawlersInBox(box.box_id).then(() => {
          this.onPageLoaded();
        });
      },
      error: (error) => {
        this.router.navigate(['/inventory']).then(() => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo cargar la caja.'});
        });
        this.pageLoaded = false;
      }
    })
  }

  loadBrawlersInBox(box_id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.brawlerService.getUserProbabilityBrawlersFromBox(box_id).subscribe({
        next: (brawlers) => {
          this.brawlersCanGetInBox = brawlers;

          if (!this.brawlersCanGetInBox || this.brawlersCanGetInBox.length === 0) {
            this.throwNoBrawlerError();
            reject();
            return;
          }

          resolve();
        },
        error: (error) => {
          reject(error);
          this.router.navigate(['/inventory']).then(() => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo cargar los brawlers de la caja.'
            });
          });
          this.pageLoaded = false;
        }});
    });
  }

  throwNoBrawlerError() {
    this.router.navigate(['/inventory']).then(() => {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo seleccionar ningún brawler.'});
    });
    this.pageLoaded = false;
  }

  saveBoxOpenResults() {
    this.inventoryService.saveBoxOpenResults(this.box.id, this.brawlersInBox).subscribe({
      next: () => {
        this.navigateToBoxResume();
      },
      error: (error) => {
        this.router.navigate(['/inventory']).then(() => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo guardar los resultados de la caja.'});
        });
        this.pageLoaded = false;
      }
    });
  }

  onPageLoaded() {
    this.pageLoaded = true;

    if (this.box.open) {
      this.router.navigate(['/inventory']).then(() => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'La caja ya ha sido abierta.'});
      });
      this.pageLoaded = false;
      return;
    }

    // Evento de despues de la carga del documento
    setTimeout(() => {
      const boxDropSound = new Audio("/audios/box/box-drop.ogg");
      boxDropSound.volume = 0.4;
      boxDropSound.play();
    }, 500);

    this.setBrawlersInBox();
  }

  getBoxImage() {
    return BoxTypeImages[this.box.type];
  }

  isBrawlerDuplicate(brawler: UserBrawlerProbabilityResponse): boolean {
    return brawler.user_quantity > 0;
  }

  setBrawlersInBox() {
    const brawlersInBox = this.decideAllBrawlersInBox();

    if (!brawlersInBox) {
      this.router.navigate(['/inventory']).then(() => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo seleccionar ningún brawler.'});
      });
      this.pageLoaded = false;
      return;
    }

    this.brawlersInBox = brawlersInBox;
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
    const audio = new Audio("/audios/box/open-box.ogg");
    audio.volume = 0.6;
    audio.play();

    this.saveBoxOpenResults();

    this.showFlash().then(() => {
      this.openNextItem();
    });
  }

  openNextItem() {
    const index = this.brawlersOpened.length;
    const brawlerIndex = this.brawlersCanGetInBox.findIndex(brawler => brawler.id === this.brawlersInBox[index]);
    const brawler = this.brawlersCanGetInBox[brawlerIndex];
    this.changeItemAnimation = true;

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
    this.brawlersCanGetInBox[brawlerIndex].user_quantity++;
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
    const duplicateBrawlerSound = new Audio("/audios/box/get-powerpoints.ogg");
    duplicateBrawlerSound.volume = 0.6;
    duplicateBrawlerSound.play();

    const totalTrophies = this.trophyService.getTotalTrophies(brawler.user_quantity);
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
    this.newBrawlerRarity.brawlers_of_rarity_unlocked++;
    this.actualPage = 'new-brawler-mystery-spins';
    const brawlerRollSound = new Audio("/audios/box/brawler-roll-out.ogg");
    brawlerRollSound.volume = 0.6;
    brawlerRollSound.play();

    setTimeout(() => {
      this.actualPage = 'new-brawler-unlocked';
      this.nextButtonVisible = true;
      const rarityUnlockedSound = new Audio(this.rarityUnlockedSounds[this.newBrawler.rarity_id]);
      rarityUnlockedSound.volume = 0.6;
      rarityUnlockedSound.play();

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
      return '';
    }

    return 'bg-gradient-radial via-brawl-dark-blue to-brawl-dark-blue from-brawl-blue';
  }

  getParentBgColor() {
    if (this.actualPage == 'new-brawler-unlocked') {
      return this.getNewBrawlerRarityColor();
    }

    return '';
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
    let animationTime = 50;

    return new Promise((resolve) => {

      let interval = setInterval(async () => {
        if (this.actualTrophyCount < targetCount) {
          this.actualTrophyCount++;
          this.totalTrophyCount++;
          if (this.actualTrophyCount % 2 === 0) {
            const audioGetTrophies = new Audio();
            audioGetTrophies.src = "/audios/box/get-trophies.ogg";
            audioGetTrophies.volume = 0.5;
            audioGetTrophies.play();
          }

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
    const tierUpSound = new Audio("/audios/box/tier-up.ogg");
    tierUpSound.volume = 0.6;
    tierUpSound.play();

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
