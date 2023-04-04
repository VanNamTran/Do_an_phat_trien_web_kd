import { Component } from '@angular/core';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent {
  isDropdownOpen = false;
  constructor() {}
  categoryDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen
  }
}
