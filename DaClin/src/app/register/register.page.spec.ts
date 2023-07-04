import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterPage', () => {

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const app = fixture.componentInstance
    expect(app).toBeTruthy();
  });
});
