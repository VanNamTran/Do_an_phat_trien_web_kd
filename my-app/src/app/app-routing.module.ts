import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccResetComponent } from './acc-reset/acc-reset.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { AccInfoChangeComponent } from './acc-info-change/acc-info-change.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';

const routes: Routes = [
  {path:'dangky', component: RegisterComponent},
  {path:'dangnhap', component: LoginComponent},
  {path:'quenmatkhau', component: AccResetComponent},
  {path:'matkhaumoi', component: NewPasswordComponent},
  {path:'thongtin', component: AccInfoComponent},
  {path:'capnhatthongtin', component: AccInfoChangeComponent},
  {path:'xacnhan', component: ConfirmPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  RegisterComponent,
  LoginComponent,
  AccResetComponent,
  NewPasswordComponent,
  AccInfoComponent,
  AccInfoChangeComponent,
  ConfirmPasswordComponent
]

