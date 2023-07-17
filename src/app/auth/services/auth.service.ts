import {Injectable} from '@angular/core';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {AuthResponseInterface} from 'src/app/shared/types/authResponse.interface';
import {map} from 'rxjs/operators';
@Injectable()

export class AuthService {
  constructor(private http: HttpClient) {
  }
  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response: AuthResponseInterface) => response.user));
  }
}
