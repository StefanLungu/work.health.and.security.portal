import { Subject } from 'rxjs';
import { NotificationComponent } from './notification.component';
import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommandType } from './command-type.enum';

@Injectable({ providedIn: "root" })
export class NotificationService{

    private readonly duration: number = 5000;
    public commandFinishedStatus: Subject<CommandType>;

    constructor(private _snackbar: MatSnackBar){
        this.commandFinishedStatus = new Subject<CommandType>();
    }

    public displayInfo(message: string): void {
        this._snackbar.openFromComponent(NotificationComponent, {
            duration: this.duration,
            panelClass: [ "info-notification" ],
            data: {
                message: message,
                type: "info"
            }
            
        });
    }

    public displayError(message: string): void {
        this._snackbar.openFromComponent(NotificationComponent, {
            duration: this.duration,
            panelClass: [ "error-notification" ],
            data: {
                message: message,
                type: "error"
            }
        });
    }

    public displayWarning(message: string): void {
        this._snackbar.openFromComponent(NotificationComponent, {
            duration: this.duration,
            panelClass: [ "warn-notification" ],
            data: {
                message: message,
                type: "warning"
            }
        });
    }

    public setCommandFinishedStatus(commandType: CommandType): void {
        this.commandFinishedStatus.next(commandType);
    }
}