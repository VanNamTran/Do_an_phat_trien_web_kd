import { Component,HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  [x: string]: any;
  isDropdownOpen = false;
  constructor(private router: Router) {}
  infoDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen
  }
  ngOnInit(){

  }
  logout() {
    // Xóa dữ liệu trong localStorage liên quan đến người dùng đăng nhập
    localStorage.removeItem('customerId');
    localStorage.removeItem('itemsfa')
    localStorage.removeItem('itemscart')
  }
  onCartClick() {
    this.router.navigate(['/cart']).then(() => {
      setTimeout(() => {
        location.reload();
      }, 500);

    });
  }

}
