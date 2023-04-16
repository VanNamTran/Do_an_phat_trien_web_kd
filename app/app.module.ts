import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { AccResetComponent } from './acc-reset/acc-reset.component';
import { AccInfoChangeComponent } from './acc-info-change/acc-info-change.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AccInfoComponent,
    AccResetComponent,
    AccInfoChangeComponent,
    NewPasswordComponent,
    ConfirmPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }