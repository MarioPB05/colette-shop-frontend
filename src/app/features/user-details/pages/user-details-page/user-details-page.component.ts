import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '@features/user-details/service/user.service';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {UserStatComponent} from '@features/user-details/components/user-stat/user-stat.component';
import {ModalDataComponent} from '@features/user-details/components/modal-data/modal-data.component';
import {NgForOf, NgIf} from '@angular/common';
import {
  BrawlImageModalComponent
} from '@features/user-details/components/brawl-image-modal/brawl-image-modal.component';
import {OrderUserDetailsResponse} from '@models/order.model';
import {OrderCardComponent} from '@features/user-details/components/order-card/order-card.component';
import {MessageService} from 'primeng/api';
import {UserBrawler, UserDetailsResponse} from '@models/user.model';

@Component({
  selector: 'app-user-details-page',
  imports: [
    BrawlHeaderComponent,
    UserStatComponent,
    ModalDataComponent,
    BrawlImageModalComponent,
    NgIf,
    OrderCardComponent,
    NgForOf
  ],
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class UserDetailsPageComponent implements OnInit {

  protected user!: UserDetailsResponse;
  protected brawlers!: UserBrawler[];
  protected orders!: OrderUserDetailsResponse[];

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']).then(r => r);
    }

    this.userService.getUserDetails().subscribe({
      next: (user) => {
        this.user = user;

        this.userService.getBrawlersOfUser().subscribe({
          next: (brawlers) => {
            this.brawlers = brawlers;

          },
          error: (err) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to load brawlers'});
          }
        });
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to load user details'});
      }
    });

    this.userService.getOrderOfUser().subscribe(orders => {
      this.orders = orders;
    });
  }

  redirectHomePage() {
    this.router.navigate(['/']).then(r => r);
  }

  changeBrawler(brawler: UserBrawler) {
    this.user.brawlerAvatar = brawler;
  }
}
