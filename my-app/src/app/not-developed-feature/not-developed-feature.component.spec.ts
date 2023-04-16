import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotDevelopedFeatureComponent } from './not-developed-feature.component';

describe('NotDevelopedFeatureComponent', () => {
  let component: NotDevelopedFeatureComponent;
  let fixture: ComponentFixture<NotDevelopedFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotDevelopedFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotDevelopedFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
