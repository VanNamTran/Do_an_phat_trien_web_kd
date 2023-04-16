import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccResetComponent } from './acc-reset/acc-reset.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { AccInfoChangeComponent } from './acc-info-change/acc-info-change.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    RegisterComponent,
    LoginComponent,
    AccResetComponent,
    NewPasswordComponent,
    AccInfoComponent,
    AccInfoChangeComponent,
    ConfirmPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
