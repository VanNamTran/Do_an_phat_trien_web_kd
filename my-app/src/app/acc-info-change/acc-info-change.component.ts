import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { UserAPIService } from '../services/user-api.service';
import { User } from '../models/User';

@Component({
  selector: 'app-acc-info-change',
  templateUrl: './acc-info-change.component.html',
  styleUrls: ['./acc-info-change.component.css']
})
export class AccInfoChangeComponent implements OnInit {

  user!: User;


  updateInfoForm=this._fb.group({
    name: [
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(35),
        Validators.pattern('[a-zA-ZÀ-Ỹà-ỹ ]*'),
        customValidator
      ])
    ],
    address: [
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(50)
      ])
    ],
  })

  constructor(
    private _fb: FormBuilder,
    private _service: UserAPIService,
    private router: Router,
    private _router: ActivatedRoute){}

  ngOnInit(): void {
    this._router.queryParams.subscribe(params =>{
      this.user = new User(
        params['_id'],
        params['phone'],
        params['email'],
        params['name'],
        params['address'],
        '',
        '',
      );
      // update the form with the user's current name and address
      this.updateInfoForm.patchValue({
        name: this.user.name,
        address: this.user.address
      });
    });
  }

  onSubmit():void{
    const name = this.updateInfoForm.get('name')?.value || this.user.name;
    const address = this.updateInfoForm.get('address')?.value || this.user.address;
    const userId = this.user._id;
    this._service.updateInfo(userId, name, address).subscribe({
      next: res => {
        console.log(res);
        alert("Cập nhật thành công!");
      },
      error: err => {
        console.error(err);
        alert("Có lỗi xảy ra khi cập nhật thông tin!");
      }
    })
  }

  onChangePasswordClick(): void {
    const userId = this.user._id;
    this.router.navigate(['/doimatkhau'], { queryParams: { _id: userId } });
  }


}
export function customValidator(control: AbstractControl): {
  [key:string]:any} | null {
    const matchName = /\@|\#|\$|\%|\^|\&|\*/g.test(control.value);
    return matchName ? {'nameNotMatch' : {value: control.value}} : null;
}

