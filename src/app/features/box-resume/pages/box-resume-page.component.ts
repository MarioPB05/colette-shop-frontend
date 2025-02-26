import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {
  BrawlerUnlockedCardComponent
} from '@features/box-resume/components/brawler-unlocked-card/brawler-unlocked-card.component';
import {
  BrawlerDuplicateCardComponent
} from '@features/box-resume/components/brawler-duplicate-card/brawler-duplicate-card.component';
import {InventoryBrawlerResponse} from '@models/brawler.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BrawlerService} from '@features/box-resume/services/brawler.service';
import {MessageService} from 'primeng/api';

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
  standalone: true
})
export class BoxResumePageComponent implements OnInit {
  pageLoaded: boolean = false;
  brawlers: InventoryBrawlerResponse[] = [];
  brawlersCards: BrawlerCard[] = [];
  brawlerCardsAppearing: BrawlerCard[] = [];
  animation_finished: boolean = false;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private brawlerService: BrawlerService,
              private messageService: MessageService) {}

  ngOnInit() {
    this.getInventoryBrawlers().then(() => {
      this.brawlersCards = this.convertBrawlersToCards();

      if (this.brawlersCards.length === 0) {
        this.router.navigate(['/inventory']).then(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se encontraron brawlers en esta apertura'
          });
        })
      }

      this.pageLoaded = true;
      this.doAppearBrawlerCardsAnimation();
    }).catch(() => {
      this.router.navigate(['/inventory']);
    });
  }

  getInventoryBrawlers(): Promise<void> {
    const item_id = this.activeRoute.snapshot.params['item_id'];

    return new Promise((resolve, reject) => {
      this.brawlerService.getInventoryBrawlers(item_id).subscribe({
        next: (brawlers: InventoryBrawlerResponse[]) => {
          this.brawlers = brawlers;
          resolve();
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  doAppearBrawlerCardsAnimation() {
    const appear_sound = new Audio('/audios/box/reveal-resume-item.ogg');
    appear_sound.volume = 0.5;
    for (let i = 0; i < this.brawlersCards.length; i++) {
      setTimeout(() => {
        this.brawlerCardsAppearing.push(this.brawlersCards[i]);
        appear_sound.play();

        if (i === this.brawlersCards.length - 1) {
          setTimeout(() => {
            this.animation_finished = true;
          }, 2000);
        }

      }, i * 1100);
    }
  }

  goToInventory() {
    this.router.navigate(['/inventory']);
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

      if (brawler.user_quantity_actual + brawler.user_quantity_past > 1 && brawler.user_quantity_actual > 0) {
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

    if (!brawler) {
      return 0;
    }

    // Le sumamos uno si el usuario ya tenia ese brawler, para que la animacion de trofeos empiece en el valor correcto
    return brawler.user_quantity_past > 0 ? brawler.user_quantity_actual + 1 : brawler.user_quantity_actual;
  }
}
