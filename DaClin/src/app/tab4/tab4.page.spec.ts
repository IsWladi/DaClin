import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Tab4Page } from './tab4.page';

describe('Tab4Page', () => {
  let component: Tab4Page;
  let fixture: ComponentFixture<Tab4Page>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tab4Page],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
