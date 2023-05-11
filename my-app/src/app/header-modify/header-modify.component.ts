
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-modify',
  templateUrl: './header-modify.component.html',
  styleUrls: ['./header-modify.component.css']
})
export class HeaderModifyComponent implements OnInit {
  @Output() openModalEvent = new EventEmitter();
  @Output() closeModalEvent = new EventEmitter();

  user: User | null = null;
  loggedIn: boolean = false;
  dropdownOpen: boolean = false;

  showModal = false;

  constructor(
    private _userService: UserService,
    private _router: Router) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.user = user;
      this.loggedIn = true;
    }

    this._userService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.loggedIn = true;
      } else {
        this.user = null;
        this.loggedIn = false;
      }
    });
  }

  openModal() {
    if (!this.loggedIn) {
      this.showModal = true;
      this.openModalEvent.emit();
    } else {
      this.dropdownOpen = !this.dropdownOpen;
    }
  }

  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit();
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('customerId');
    localStorage.removeItem('itemsfa')
    localStorage.removeItem('itemscart')
    this.user = null;
    this.loggedIn = false;
    this.dropdownOpen = false;
    this._router.navigate(['/dangnhap']);
  }

  updateInfo() {
    if (this.loggedIn) {
      const user = this.user;
      this._router.navigate(['/capnhatthongtin'], {
        queryParams: {
          _id: user?._id,
          phone: user?.phone,
          email: user?.email,
          name: user?.name,
          address: user?.address,
          password: user?.password
        }
      });
    }
  }
  onCartClick() {
    this._router.navigate(['/cart']).then(() => {
      setTimeout(() => {
        location.reload();
      }, 1000);

    });
  }
}
