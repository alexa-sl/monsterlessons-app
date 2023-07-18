import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {registerAction, registerFailureAction, registerSuccessAction} from '../actions/actions';
import {catchError, of, switchMap} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class RegisterEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {};

  register$ = createEffect(() => {
     return this.actions$.pipe(
        ofType(registerAction),
        switchMap(({request}) => {
            return this.authService.register(request).pipe(
              map((currentUser: CurrentUserInterface) => {
                return registerSuccessAction({currentUser});
              }),

              catchError((errorResponse: HttpErrorResponse) => {
                return of(registerFailureAction(errorResponse.error));
              })
            )
        })
     )});

}
