import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginPage', () => {

  beforeEach(( async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance
    expect(app).toBeTruthy();
  });
});
