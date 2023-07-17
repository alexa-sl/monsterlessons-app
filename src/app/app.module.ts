import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from 'src/app/app-routing.module'
import {AppComponent} from 'src/app/app.component'
import {AuthModule} from 'src/app/auth/auth.module'
import {AuthService} from 'src/app/auth/services/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
