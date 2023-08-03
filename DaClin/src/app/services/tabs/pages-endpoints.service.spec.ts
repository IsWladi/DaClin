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
  it("close session", () => {
    service.auth.userId = "123456"
    localStorage.setItem('userId', "123456");
    service.closeSesion(true);
    expect(service.auth.userId).toEqual("");
    expect(localStorage.getItem('userId')).toBeNull();
  });
});
