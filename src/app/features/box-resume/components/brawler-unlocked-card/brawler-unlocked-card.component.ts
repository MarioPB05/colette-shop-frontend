import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-brawler-unlocked-card',
  imports: [],
  standalone: true,
  templateUrl: './brawler-unlocked-card.component.html'
})
export class BrawlerUnlockedCardComponent {
  @Input() brawler_name!: string;
  @Input() brawler_image!: string;
}
