import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {registerAction} from 'src/app/auth/store/actions';
import {isSubmittingSelector} from '../../store/selectors';

@Component({
  selector: 'ml-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store) {
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
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid);
    this.store.dispatch(registerAction(this.form.value));
  }
}
