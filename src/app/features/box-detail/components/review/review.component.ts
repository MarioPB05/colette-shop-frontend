import {Component, Input} from '@angular/core';
import {ReviewResponse} from '@models/review.model';

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.component.html',
  standalone: true,
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class ReviewComponent {
  @Input() review: ReviewResponse = {
    id: 1,
    user_id: 1,
    username: 'Javier',
    rating: 4,
    comment: 'Muy buen producto, me encantó la calidad y el precio es muy bueno. Lo recomiendo mucho.',
    post_date: '2025-01-01 12:00:00'
  }

  getStarImage(rating: number, index: number) {
    return rating >= index ? '/images/stars/star-full.svg' : '/images/stars/star-empty.svg';
  }

  getFormattedDate(date: string) {
    // Convertir '2021-08-01 12:00:00' a 8d 6h (Desde la fecha actual)
    const currentDate = new Date();
    const reviewDate = new Date(date);
    const diff = currentDate.getTime() - reviewDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (hours < 1) {
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${minutes} min`;
    }

    if (days < 1) {
      return `${hours}h`;
    }

    if (days < 40) {
      return `${days}d ${hours}h`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
      return `${months}` + (months === 1 ? ' mes' : ' meses');
    }

    const years = Math.floor(months / 12);
    return `${years}` + (years === 1 ? ' año' : ' años');
  }
}
