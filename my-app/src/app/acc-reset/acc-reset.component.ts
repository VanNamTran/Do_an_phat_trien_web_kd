import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAPIService } from '../services/user-api.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acc-reset',
  templateUrl: './acc-reset.component.html',
  styleUrls: ['./acc-reset.component.css']
})
export class AccResetComponent implements OnInit {

  // email: string = '';

  sendOTPSuccess: string = '';
  sendOTPError: string = '';

  falseOTP: string='';

  sendEmailForm=this._fb.group({
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email
      ])
    ]
  })

  sendOTPForm=this._fb.group({
    otp: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^\d{6}$/)
      ])
    ]
  })


  constructor(
    private _fb: FormBuilder,
    private _service: UserAPIService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit1() {
    const email = this.sendEmailForm.value.email;
    if (email) {
      this._service.sendEmail(email).subscribe({
        next: (response) => {
          console.log(response);
          this.sendOTPSuccess = `Mã xác thực đã được gửi đến địa chỉ ${email}. Vui lòng kiểm tra email!`;
          this.sendOTPError = '';
        },
        error: (error) => {
          console.log(error);
          this.sendOTPSuccess = '';
          this.sendOTPError = 'Email không tồn tại!';
        }
      });
    } else {
      alert("Lỗi hệ thống")
    }
  }



  onSubmit2() {
    const email= this.sendEmailForm.value.email
    const otp = this.sendOTPForm.value.otp;
    if (otp) {
      this._service.sendOTP(otp).subscribe({
        next: (response) => {
          console.log(response);
          // Redirect to password reset page
          this._router.navigate(['/matkhaumoi'], { queryParams: { email: email, otp: otp } });
        },
        error: (error) => {
          console.log(error);
          this.falseOTP = 'Mã xác thực không đúng!';
        }
      });
    } else {
      alert("Lỗi hệ thống")
    }

  }
}
