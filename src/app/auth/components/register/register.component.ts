import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {registerAction} from 'src/app/auth/store/actions/actions';
import {isSubmittingSelector, validationErrorsSelector} from 'src/app/auth/store/selectors';
import {RegisterRequestInterface} from 'src/app/auth/types/registerRequest.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';

@Component({
  selector: 'ml-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  validationErrors$: Observable<BackendErrorsInterface | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    console.log('init form');
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.validationErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid);
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}));
  }
}
