import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletDetailComponent } from './tablet-detail.component';

describe('TabletDetailComponent', () => {
  let component: TabletDetailComponent;
  let fixture: ComponentFixture<TabletDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabletDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabletDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
