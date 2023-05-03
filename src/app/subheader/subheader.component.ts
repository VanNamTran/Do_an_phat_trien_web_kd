import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent {
  isDropdownOpen = false;
  constructor(private router:Router) {}
  categoryDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen
  }
  openLaptop(){
    this.router.navigate(['laptop']);
  }
}
