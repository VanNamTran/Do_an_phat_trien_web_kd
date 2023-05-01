import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAPIService } from '../services/user-api.service';
import { User } from '../models/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this._fb.group({
    username: [
      '',
      Validators.required,
    ],
    password: [
      '',
      Validators.required,
    ],
  });

  constructor(
    private _fb: FormBuilder,
    private _service: UserAPIService
  ) { }

  ngOnInit(): void {
    const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser') || '{}');
    if (rememberedUser && rememberedUser.username && rememberedUser.password) {
      this.loginForm.patchValue({
        username: rememberedUser.username,
        password: rememberedUser.password
      });
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const user = {
      phone: this.loginForm.value.username,
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this._service.loginUser(user).subscribe({
      next: (data: User) => {
        alert('Đăng nhập thành công!')
      },
      error: (error: Error) => {
        alert(error.message);
      }
    });
  }


  onRememberMeChange(event: any) {
    if (event.target.checked) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      localStorage.setItem('rememberedUser', JSON.stringify({ username, password }));
    } else {
      localStorage.removeItem('rememberedUser');
    }
  }
}
