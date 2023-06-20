import { TestBed } from '@angular/core/testing';

import { PagesEndpointsService } from './pages-endpoints.service';

describe('PagesEndpointsService', () => {
  let service: PagesEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
