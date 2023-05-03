import { TestBed } from '@angular/core/testing';

import { ProductsViewService } from './products-view.service';

describe('ProductsViewService', () => {
  let service: ProductsViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
