import {Component, inject, OnInit} from '@angular/core';
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
  protected selectedUser : TableUserResponse | null | undefined;

  items!: MenuItem[];

  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getAllUser().subscribe({
      next: users => {
        for (const user of users) {
          this.users.push(user);
          this.userOriginal.push(user);
        }
      },
      error: err => {
        console.error('Error al cargar los usuarios:', err);
      }
    });

    this.items = [
      { label: 'Ver detalles', icon: 'pi pi-fw pi-search', command(event: MenuItemCommandEvent) {
          console.log(event.item);
        }
      },
      { label: 'Deshabilitar', icon: 'pi pi-fw pi-times', command(event: MenuItemCommandEvent) {
          console.log(event.item);
        }}
    ]

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
}
