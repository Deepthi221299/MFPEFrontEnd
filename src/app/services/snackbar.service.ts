import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) { }

    public openSnackBar(message: string, snackType: SnackType, showButton: boolean = true, duration?: number, action?: string) {
        this.closeSnackBar();
        this.snackBar.openFromComponent(SnackbarComponent, {
            duration: duration ? duration : 4000,
            panelClass: this.getSnackBarData(snackType),
            data: { message: message, snackType: snackType, showButton: showButton }
        });
    }

    public closeSnackBar() {
        this.snackBar.dismiss();
    }

    getSnackBarData(snackType: number): string {
        switch (snackType) {
            case SnackType.SUCCESS:
                return 'done';
            case SnackType.ERROR:
                return 'error';
            case SnackType.WARNING:
                return 'warning';
            case SnackType.INFO:
                return 'info';
            default:
                return 'info';
        }
    }

}

export enum SnackType {
    SUCCESS, ERROR, WARNING, INFO
}

