import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { UserAPIService } from '../services/user-api.service';
import { User } from '../models/User';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user!: User;
  currentPasswordError: string = '';

  changePasswordForm=this._fb.group({

    currentPassword: [
      '',
      Validators.required,
    ],
    newPassword: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/),
      ])
    ],
    confirmNewPassword: [
      '',
      Validators.required
    ]
  },
  {
    validator: [passwordValidator]
  });

  constructor(
    private _fb: FormBuilder,
    private _service: UserAPIService,
    private _router: ActivatedRoute){}

  ngOnInit(): void {
    this._router.queryParams.subscribe(params =>{
      this.user = new User(
        params['_id'],
        '',
        '',
        '',
        '',
        '',
        '',
      );
    });
  }

  onSubmit():void {
    const userId = this.user._id;
    const currentPassword = this.changePasswordForm.value.currentPassword;
    const newPassword = this.changePasswordForm.value.newPassword;

    // Remove confirmNewPassword from the form value
    delete this.changePasswordForm.value.confirmNewPassword;

    this._service.changePassword(userId, currentPassword, newPassword).subscribe({
      next: (res) => {
        console.log(res);
        alert('Thay đổi mật khẩu thành công!');
      },
      error: (err) => {
        console.log(err);
        if (err && err.error && err.error.error === 'Invalid current password') {
          this.currentPasswordError = 'Mật khẩu hiện tại không đúng';
        } else {
          alert('Thay đổi mật khẩu thất bại!');
        }
      }
    });
  }


}
export function passwordValidator(control: AbstractControl): {
  [key:string]:any} | null {
    const newPassword = control.get('newPassword');
    const confirmNewPassword = control.get('confirmNewPassword');
    if ((newPassword && newPassword.pristine) || (confirmNewPassword && confirmNewPassword.pristine)) {
      return null;
    }
    return newPassword && confirmNewPassword && newPassword.value !== confirmNewPassword.value ? {'misMatch': true} : null;
}
