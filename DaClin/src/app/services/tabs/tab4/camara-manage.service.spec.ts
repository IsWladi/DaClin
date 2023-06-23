import { TestBed } from '@angular/core/testing';

import { CamaraManageService } from './camara-manage.service';

describe('CamaraManageService', () => {
  let service: CamaraManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamaraManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
