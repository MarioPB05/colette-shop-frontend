import {Component, inject, OnInit} from '@angular/core';
import {ShowUserResponse} from '@models/user.model';
import {UserService} from '@dashboard/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {Card} from 'primeng/card';
import {DatePipe} from '@angular/common';
import {TableOrderComponent} from '@dashboard/components/table-order/table-order.component';

@Component({
  selector: 'app-user-details-page',
  imports: [
    Card,
    DatePipe,
    TableOrderComponent
  ],
  templateUrl: './user-details-page.component.html',
  styles: ``
})
export class UserDetailsPageComponent implements OnInit {

  protected user!: ShowUserResponse;
  private userId!: string;
  private brawlTag: string = '';

  userService = inject(UserService);
  private router: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.brawlTag = this.route.snapshot.paramMap.get('brawlTag')!;

    this.userService.showUser(this.brawlTag).subscribe((user) => {
      this.user = user;
    });
  }

}
