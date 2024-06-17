import { CommonModule } from '@angular/common';
import { NotificationSettings } from './notification-settings.model';
import { Component, inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    templateUrl: "notification.component.html",
    standalone: true,
    imports: [
        CommonModule,
        MatSnackBarModule
    ]
})
export class NotificationComponent{

    // dependencies
    public readonly settings: NotificationSettings = inject<NotificationSettings>(MAT_SNACK_BAR_DATA);
}