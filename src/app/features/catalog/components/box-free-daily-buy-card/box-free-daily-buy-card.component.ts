import {Component, EventEmitter, input, Input, OnInit, Output} from '@angular/core';
import {DailyBoxShopResponse} from '@models/box.model';
import {interval, take} from 'rxjs';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-box-free-daily-buy-card',
  imports: [
    NgIf,
    Tooltip
  ],
  templateUrl: './box-free-daily-buy-card.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss', "./../../../../../styles.scss"],
  standalone: true
})
export class BoxFreeDailyBuyCardComponent implements OnInit {
  gradientByBoxType : {[key: string]: string} = {
    "Caja": "from-[#3DE2FB] to-[#1375FF]",
    "Caja grande": "from-[#fbb9ff] to-[#f230ff]",
    "Megacaja": "from-[#FFFFFF] to-[#FFD700]",
    "Omegacaja": "from-[#ffed7b] to-[#ff1616]"
  };

  headerByBoxType : {[key: string]: string} = {
    "Caja": "bg-[#1375FF]",
    "Caja grande": "bg-[#f230ff]",
    "Megacaja": "bg-[#FFD700]",
    "Omegacaja": "bg-[#ff1616]"
  }

  imageByBoxType : {[key: string]: string} = {
    "Caja": "common-box.png",
    "Caja grande": "big-box.png",
    "Megacaja": "megabox.png",
    "Omegacaja": "omegabox.png"
  }

  @Input() box : DailyBoxShopResponse = {
    id: 1,
    name: 'Box name',
    type: 'Box type',
    favorite_brawlers_in_box: 3,
    repeat_every_hours: 24,
    claimed: false
  };

  timeToNextBox: string = '0h 0m 0s';
  @Output() addToCart = new EventEmitter<DailyBoxShopResponse>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.calculateTimeToNextBox();
    interval(1000).pipe(take(1000))
    .subscribe(() => {
      this.calculateTimeToNextBox();
    });
  }

  goToBoxDetails() {
    this.router.navigate([`/box/${this.box.id}`]);
  }

  calculateTimeToNextBox() {
    const now = new Date();

    const midnight = new Date(now.setHours(0, 0, 0, 0));

    const nextBoxTime = new Date(midnight.getTime() + this.box.repeat_every_hours * 60 * 60 * 1000);

    let diff = nextBoxTime.getTime() - new Date().getTime(); // Diferencia entre medianoche y la fecha calculada

    diff = diff / 1000;

    const hours = Math.floor(diff / 3600);
    diff -= hours * 3600;
    const minutes = Math.floor(diff / 60);
    diff -= minutes * 60;
    const seconds = Math.floor(diff % 60);

    // Formatea el tiempo en formato de 2 dígitos
    this.timeToNextBox = `${this.padZero(hours)}h ${this.padZero(minutes)}m ${this.padZero(seconds)}s`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  addBoxToCart() {
    this.addToCart.emit(this.box);
  }
}
