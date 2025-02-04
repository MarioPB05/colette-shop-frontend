import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {MenuItem, MenuItemCommandEvent, PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {NgClass} from '@angular/common';
import {UserService} from '@dashboard/services/user.service';
import {TableUserResponse} from '@core/models/user.model';
import {ContextMenu} from 'primeng/contextmenu';
import {Button} from 'primeng/button';
import {Menu} from 'primeng/menu';

@Component({
  selector: 'app-user-page',
  imports: [
    IconField,
    InputIcon,
    InputText,
    PrimeTemplate,
    TableModule,
    NgClass,
    ContextMenu,
    Button,
    Menu
  ],
  templateUrl: './user-page.component.html',
  styles: ``
})
export class UserPageComponent  implements OnInit {

  protected users: TableUserResponse[] = [];
  private userFilter: TableUserResponse[] = [];
  private userOriginal: TableUserResponse[] = [];
  protected selectedUser!: TableUserResponse | null;

  items!: MenuItem[];

  @ViewChild('menu') menu!: Menu;

  userService = inject(UserService);
  router = inject(Router);

  ngOnInit(): void {
    this.userService.getAllUser().subscribe({
      next: users => {
        this.users = users;
        this.userOriginal = users;
      },
      error: err => {
        console.error('Error al cargar los usuarios:', err);
      }
    });
  }

  filterUserForName(event: any): void {
    this.userFilter = this.userOriginal.filter(user => user.name.toLowerCase().includes(event.target.value.toLowerCase()));
    this.users = this.userFilter;
  }

  getBadgeText(isEnable: boolean): string {
    switch (isEnable) {
      case true:
        return 'Habilitado';
      case false:
        return 'Deshabilitado';
      default:
        return '';
    }
  }

  getBadgeClass(isEnable: boolean): string {
    switch (isEnable) {
      case true:
        return 'bg-[green]';
      case false:
        return 'bg-[red]';
      default:
        return '';
    }
  }

  openActionsMenu(event: Event, user: TableUserResponse): void {
    this.menu.toggle(event);
    this.selectedUser = user;

    this.items = [
      {
        label: 'Ver detalles',
        icon: 'pi pi-fw pi-search',
        command: () => this.router.navigate([`/dashboard/users/${user.brawlTag}`])
      }
    ];

    if (this.selectedUser.enabled) {
      this.items.push({
        label: 'Deshabilitar',
        icon: 'pi pi-fw pi-times',
        command: () => this.disableUser(this.selectedUser)
      });
    } else {
      this.items.push({
        label: 'Habilitar',
        icon: 'pi pi-fw pi-check',
        command: () => this.enableUser(this.selectedUser)
      });
    }
  }

  disableUser(user: TableUserResponse | null): void {
    if (!user) return;
    this.userService.disableUser(user.id).subscribe({
      next: () => {
        user.enabled = false;
        this.userOriginal = this.userOriginal.map(u => u.id === user.id ? user : u);
        this.users = this.userOriginal;
      },
      error: err => {
        console.error('Error al deshabilitar el usuario:', err);
      }
    });
  }

  enableUser(user: TableUserResponse | null): void {
    if (!user) return;
    this.userService.enableUser(user.id).subscribe({
      next: () => {
        user.enabled = true;
        this.userOriginal = this.userOriginal.map(u => u.id === user.id ? user : u);
        this.users = this.userOriginal;
      },
      error: err => {
        console.error('Error al habilitar el usuario:', err);
      }
    });
  }

}
