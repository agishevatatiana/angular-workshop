import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class NotificationsService {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  handleError(operation = 'operation', request): any {
    return (error: any): Observable<any> => {
      if (error && (error.status || error.status === 0)) {
        this.openErrorNotification(`${error.statusText} - Try ${request} again latter.`, error.status);
      }
      return of({error: true});
    };
  }

  private openErrorNotification(message: string, errorStatus: number): Subscription {
    const loginExpired = (errorStatus === 502 || errorStatus === 401);
    const actionText = loginExpired ? 'Log In' : 'Close';
    return this.snackBar.open(message, actionText, {panelClass: 'style-error'})
      .onAction()
      .pipe(take(1))
      .subscribe(() => {
        if (loginExpired) {
          this.snackBar.dismiss();
          this.router.navigate(['/login']);
          return;
        }
        this.snackBar.dismiss();
        return;
      });
  }
}
