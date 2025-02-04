import {Component, inject, OnInit} from '@angular/core';
import {ShowUserResponse} from '@models/user.model';
import {UserService} from '@dashboard/services/user.service';
import {routes} from '../../../../app.routes';

@Component({
  selector: 'app-user-details-page',
  imports: [],
  templateUrl: './user-details-page.component.html',
  styles: ``
})
export class UserDetailsPageComponent implements OnInit {

  // protected user!: ShowUserResponse;
  // private userId!: string;
  // private brawlTag: string = '';
  //
  // userService = inject(UserService);
  // private router: any;
  //
  // ngOnInit() {
  //   this.brawlTag = this.router.url.split('/').pop() || '';
  }

}
