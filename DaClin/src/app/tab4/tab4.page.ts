import { Component, OnInit } from '@angular/core';
import { PagesEndpointsService } from '../services/tabs/pages-endpoints.service';
import { AuthService } from '../services/autenticacion/auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
