import { LoadingAdminPage } from './loading-admin.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
describe('LoadingAdminPage', () => {

  beforeEach((async() => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingAdminPage ],
      imports: [HttpClientTestingModule]
    }).compileComponents();

  }));

  it('should create', () => {
    expect(LoadingAdminPage).toBeTruthy();
  });
});
