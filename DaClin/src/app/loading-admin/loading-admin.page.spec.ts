import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingAdminPage } from './loading-admin.page';

describe('LoadingAdminPage', () => {
  let component: LoadingAdminPage;
  let fixture: ComponentFixture<LoadingAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoadingAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
