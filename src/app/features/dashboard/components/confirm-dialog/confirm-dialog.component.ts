import {Component, Input} from '@angular/core';
import {Button} from "primeng/button";
import {ConfirmDialog} from "primeng/confirmdialog";
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    Button,
    ConfirmDialog,
    NgClass
  ],
  templateUrl: './confirm-dialog.component.html',
  styles: ``
})
export class ConfirmDialogComponent {
  @Input() acceptButtonLabel!: string;
  @Input() rejectButtonLabel!: string;
  @Input() acceptButtonSeverity!: Button['severity'];
  @Input() rejectButtonSeverity!: Button['severity'];
  @Input() iconTextColor!: string;
}
