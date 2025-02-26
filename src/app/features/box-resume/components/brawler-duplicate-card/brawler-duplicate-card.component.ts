import {Component, Input, OnInit} from '@angular/core';
import {TrophyService} from '@shared/services/trophy.service';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-brawler-duplicate-card',
  imports: [
    Tooltip
  ],
  standalone: true,
  templateUrl: './brawler-duplicate-card.component.html'
})
export class BrawlerDuplicateCardComponent implements OnInit {
  @Input() brawler_name!: string;
  @Input() brawler_quantity!: number;
  @Input() brawler_image!: string;
  trophy_count: number = 0;

  constructor(private trophyService: TrophyService) {}

  ngOnInit() {
    this.playTrophyCountAnimation();
  }

  playTrophyCountAnimation() {
    const total_count = this.trophyService.getTotalTrophies(this.brawler_quantity);
    const animation_total_time = 900;

    for (let i = 0; i < total_count; i++) {
      setTimeout(() => {
        this.trophy_count++;
      }, i * (animation_total_time / total_count));
    }
  }
}
