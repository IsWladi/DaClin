import { LoadingController, Platform } from '@ionic/angular';
import { PagesEndpointsService } from '../pages-endpoints.service';
import { AuthService } from '../../autenticacion/auth.service';

import { CamaraManageService } from './camara-manage.service';

describe('CamaraManageService', () => {
  let service: CamaraManageService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let platformSpy: jasmine.SpyObj<Platform>;
  let loadingCtrlSpy: jasmine.SpyObj<LoadingController>;
  let apiServiceSpy: jasmine.SpyObj<PagesEndpointsService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['metodo1', 'metodo2']);
    platformSpy = jasmine.createSpyObj('Platform', ['metodo1', 'metodo2']);
    loadingCtrlSpy = jasmine.createSpyObj('LoadingController', ['metodo1', 'metodo2']);
    apiServiceSpy = jasmine.createSpyObj('PagesEndpointsService', ['metodo1', 'metodo2']);
    service = new CamaraManageService(authServiceSpy, platformSpy, loadingCtrlSpy, apiServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
