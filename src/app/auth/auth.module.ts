import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RegisterComponent} from './components/register/register.component'
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from 'src/app/auth/store/reducers';
import {RegisterEffect} from 'src/app/auth/store/effects/register.effect';
import {BackendErrorMessagesModule} from '../shared/module/backendErrorMessages/backendErrorMessages.module';
import {AuthService} from './services/auth.service';
import {PersistenceService} from '../shared/services/persistence.service';

const routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(RegisterEffect),
    BackendErrorMessagesModule
  ],
  declarations: [RegisterComponent],
  providers: [AuthService, PersistenceService]
})
export class AuthModule {}
