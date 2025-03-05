import {Component, Input} from '@angular/core';
import {Rating} from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {ReviewService} from '@features/open-box/services/review.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {NgClass, NgIf} from '@angular/common';
import {UserDetailsService} from '@shared/services/user-details.service';

@Component({
  selector: 'app-add-review-modal',
  imports: [
    Rating,
    FormsModule,
    Textarea,
    NgIf,
    NgClass
  ],
  templateUrl: './add-review-modal.component.html',
  standalone: true,
  styleUrl: './../../../../shared/brawl_styles.scss',
})
export class AddReviewModalComponent {
  rating: number = 0;
  comment: string = '';
  userAddedReview: boolean = false;
  @Input() boxId: number = 1;
  @Input() inventoryId: number = 1;

  // VALIDATION
  ratingValid: boolean = true;
  commentValid: boolean = true;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private messageService: MessageService,
    private userDetailsService: UserDetailsService
  ) {}

  isRatingValid(): boolean {
    return this.rating > 0;
  }

  isCommentValid(): boolean {
    return this.comment.length > 0;
  }

  validateForm(): void {
    this.ratingValid = this.isRatingValid();
    this.commentValid = this.isCommentValid();
  }

  isFormValid(): boolean {
    return this.ratingValid && this.commentValid;
  }

  addReview(): void {
    this.validateForm();

    if (!this.isFormValid()) {
      return;
    }

    this.saveReview();
  }

  saveReview() {
    this.reviewService.addReview(this.boxId, this.rating, this.comment).subscribe({
      next: (response) => {
        if (response.status === 'error') {
          this.throwReviewError();
          return;
        }

        this.userAddedReview = true;

        this.userDetailsService.updateUserDetails(true);
      },
      error: (err) => {
        this.throwReviewError();
      }
    });
  }

  throwReviewError(): void {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se ha podido añadir la reseña'});
  }

  goToBoxResume(): void {
    this.router.navigate([`/box/${this.inventoryId}/resume`]);
  }
}
