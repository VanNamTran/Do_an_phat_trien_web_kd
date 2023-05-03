import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccResetComponent } from './acc-reset.component';

describe('AccResetComponent', () => {
  let component: AccResetComponent;
  let fixture: ComponentFixture<AccResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
