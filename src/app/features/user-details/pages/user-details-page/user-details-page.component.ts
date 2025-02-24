import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '@features/user-details/service/user.service';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {BrawlerUserDetailsResponse, UserDetailsResponse} from '@models/user.model';
import {BrawlHeaderComponent} from '@shared/components/brawl-header/brawl-header.component';
import {UserStatComponent} from '@features/user-details/components/user-stat/user-stat.component';
import {ModalDataComponent} from '@features/user-details/components/modal-data/modal-data.component';
import {NgIf} from '@angular/common';
import {ModalUsernameComponent} from '@features/user-details/components/modal-username/modal-username.component';
import {
  BrawlImageModalComponent
} from '@features/user-details/components/brawl-image-modal/brawl-image-modal.component';

@Component({
  selector: 'app-user-details-page',
  imports: [
    BrawlHeaderComponent,
    UserStatComponent,
    ModalDataComponent,
    ModalUsernameComponent,
    BrawlImageModalComponent
  ],
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./../../../../shared/brawl_styles.scss']
})
export class UserDetailsPageComponent implements OnInit {

  protected user!: UserDetailsResponse;
  protected brawlers!: BrawlerUserDetailsResponse[];
  protected userBrawler!: BrawlerUserDetailsResponse;

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']).then(r => r);
    }

    this.userService.getUserDetails().subscribe(user => {
      this.user = user;
      console.log(user);

      this.userService.getBrawlersOfUser().subscribe(brawlers => {
        this.brawlers = brawlers;
        console.log(brawlers);

        this.userBrawler = this.brawlers.find(brawler => brawler.brawlerId === this.user.brawlerAvatar)!;
      });
    });
  }
}
