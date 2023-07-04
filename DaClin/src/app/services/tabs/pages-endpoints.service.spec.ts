import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PagesEndpointsService } from './pages-endpoints.service';

describe('PagesEndpointsService', () => {
  let service: PagesEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PagesEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
