import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {

  @Output() close = new EventEmitter();

  closeModal() {
    this.close.emit();
  }

  ngAfterViewInit() {
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal();
      });
    }

    const modal = document.querySelector('.modal');
    if (modal) {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          this.closeModal();
        }
      });
    }
  }
}
