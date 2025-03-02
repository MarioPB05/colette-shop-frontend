import {Component, inject, OnInit} from '@angular/core';
import {ShowUserResponse} from '@models/user.model';
import {UserService} from '@dashboard/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, NgIf} from '@angular/common';
import {TableOrderComponent} from '@dashboard/components/table-order/table-order.component';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-details-page-page',
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

  private userService = inject(UserService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.brawlTag = this.route.snapshot.paramMap.get('brawlTag')!;

    this.userService.showUser(this.brawlTag).subscribe({
      next: user => {
        this.user = user;
        this.loadingData = false;
      },
      error: () => this.router.navigate(['/dashboard/users']).then(
        () => this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo cargar el usuario'})
      )
    });
  }

}
