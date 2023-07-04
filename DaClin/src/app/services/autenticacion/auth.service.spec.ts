import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(httpClientSpy as any, TestBed.inject(Router));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('detect if user is logged in', () => {
    // set the user id in local storage
    localStorage.setItem('userId', '1');
    expect(service.isLoggedIn()).toBeTrue();
    // remove the user id from local storage
    localStorage.removeItem('userId');
  });

  it('get user id', () => {
    service.userId = '1';
    expect(service.getUserId()).toBe('1');
  });
});
