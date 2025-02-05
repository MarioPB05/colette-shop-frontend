import {Component, inject, OnInit} from '@angular/core';
import {ShowUserResponse} from '@models/user.model';
import {UserService} from '@dashboard/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe, NgIf} from '@angular/common';
import {TableOrderComponent} from '@dashboard/components/table-order/table-order.component';

@Component({
  selector: 'app-user-details-page',
  imports: [
    DatePipe,
    TableOrderComponent,
    NgIf
  ],
  templateUrl: './user-details-page.component.html',
  styles: ``
})
export class UserDetailsPageComponent implements OnInit {

  protected user!: ShowUserResponse;
  private brawlTag: string = '';
  loadingData: boolean = true;

  userService = inject(UserService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.brawlTag = this.route.snapshot.paramMap.get('brawlTag')!;

    this.userService.showUser(this.brawlTag).subscribe((user) => {
      this.user = user;
      this.loadingData = false;
    });
  }

}
