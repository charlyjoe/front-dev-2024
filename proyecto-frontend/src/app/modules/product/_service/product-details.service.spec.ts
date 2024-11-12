import { TestBed } from '@angular/core/testing';

import { ProductDetailsService } from './product-details.service';

describe('ProductDatailsService', () => {
  let service: ProductDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
