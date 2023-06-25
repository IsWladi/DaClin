import { Component } from '@angular/core';
import { PagesEndpointsService } from '../services/tabs/pages-endpoints.service';
import { AuthService } from '../services/autenticacion/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public auth:AuthService) {}

}
