import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccInfoChangeComponent } from './acc-info-change.component';

describe('AccInfoChangeComponent', () => {
  let component: AccInfoChangeComponent;
  let fixture: ComponentFixture<AccInfoChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccInfoChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccInfoChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
