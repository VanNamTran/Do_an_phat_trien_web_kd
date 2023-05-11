import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { UserAPIService } from '../services/user-api.service';
import { User } from '../models/User';
import { ApiProductsService } from '../services/api-products.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  phoneRegistered = false;
  emailRegistered = false;

  registerForm = this._fb.group({
    phone: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ],
      )
    ],
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email
      ])
    ],
    name: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(35),
        Validators.pattern('[a-zA-ZÀ-Ỹà-ỹ ]*'),
        customValidator
      ])
    ],
    address: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])
    ],
    password:[
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/),
      ])
    ],
    confirm_password:[
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
    private _Fservice: ApiProductsService,
    ) { }

  ngOnInit(): void {}

  onSubmit(): void {
    this.phoneRegistered = false;
    this.emailRegistered = false;

    // Remove confirm_password from form value
    const formValue = { ...this.registerForm.value };
    delete formValue.confirm_password;

    this._service.postUser(formValue).subscribe({
      next: (res) => {
        alert("Đăng ký thành công!");
        // tạo document mới chứa thông tin sản phẩm yêu thích và giỏ hàng cho user
        this._Fservice.postFavorite(this.registerForm.controls['phone'].value).subscribe({
          next:(res)=>{},
          error:(err)=>{}
        })
        this._Fservice.postCart(this.registerForm.controls['phone'].value).subscribe({
          next:(res)=>{},
          error:(err)=>{}
        })
      },
      error: (err) => {
        if (err.message === "Email or phone number already exists") {
          const errorData = err.error;
          if (errorData === 'phone') {
            this.phoneRegistered = true;
          } else if (errorData === 'email') {
            this.emailRegistered = true;
          }
        }
        alert("Tài khoản đã tồn tại!");
      }
    });
  }

}
export function customValidator(control: AbstractControl): {
  [key:string]:any} | null {
    const matchName = /\@|\#|\$|\%|\^|\&|\*/g.test(control.value);
    return matchName ? {'nameNotMatch' : {value: control.value}} : null;
}

export function passwordValidator(control: AbstractControl): {
  [key:string]:any} | null {
    const password = control.get('password');
    const confirm_password = control.get('confirm_password');
    if ((password && password.pristine) || (confirm_password && confirm_password.pristine)) {
      return null;
    }
    return password && confirm_password && password.value !== confirm_password.value ? {'misMatch': true} : null;
}
