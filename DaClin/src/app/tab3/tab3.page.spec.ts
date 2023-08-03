import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Tab3Page } from './tab3.page';

describe('Tab3Page', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tab3Page ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Tab3Page);
    const app = fixture.componentInstance
    expect(app).toBeTruthy();
  });
});
