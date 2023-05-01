import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAPIService } from '../services/user-api.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from '../models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  resetPasswordForm=this._fb.group({
    new_password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{8,32}$/),
      ])
    ],
    confirm_password: [
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
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      const email = params['email'];
      const otp = params['otp'];
      if (!email || !otp) {
        alert("Cập nhật không thành công!")
      }
    });
  }

  onSubmit() {
    const email = this._route.snapshot.queryParamMap.get('email');
    const otp = this._route.snapshot.queryParamMap.get('otp');
    const password = this.resetPasswordForm.value.new_password;
    if (email && otp && password) {
      this._service.resetPassword(email, otp, password).subscribe({
        next: (response) => {
          alert("Cập nhật thành công!")
        },
        error: (error) => {
          alert("Cập nhật không thành công!")
        }
      });
    } else {
      alert("Lỗi hệ thống!")
    }
  }

}
export function passwordValidator(control: AbstractControl): {
  [key:string]:any} | null {
    const new_password = control.get('new_password');
    const confirm_password = control.get('confirm_password');
    if ((new_password && new_password.pristine) || (confirm_password && confirm_password.pristine)) {
      return null;
    }
    return new_password && confirm_password && new_password.value !== confirm_password.value ? {'misMatch': true} : null;
}
