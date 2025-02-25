import {Component, Input, OnInit} from '@angular/core';
import {TrophyService} from '@shared/services/trophy.service';

@Component({
  selector: 'app-brawler-duplicate-card',
  imports: [],
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
    const total_count = this.trophyService.getTotalTrophies(this.brawler_quantity + 1);
    const animation_step_time = total_count > 100 ? 30 : 50;

    for (let i = 0; i < total_count; i++) {
      setTimeout(() => {
        this.trophy_count++;
      }, i * animation_step_time);
    }
  }
}
