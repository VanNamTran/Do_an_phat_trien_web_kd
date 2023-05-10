import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderModifyComponent } from './header-modify.component';

describe('HeaderModifyComponent', () => {
  let component: HeaderModifyComponent;
  let fixture: ComponentFixture<HeaderModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
