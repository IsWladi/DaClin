import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingAdminPageRoutingModule } from './loading-admin-routing.module';

import { LoadingAdminPage } from './loading-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingAdminPageRoutingModule
  ],
  declarations: [LoadingAdminPage]
})
export class LoadingAdminPageModule {}
