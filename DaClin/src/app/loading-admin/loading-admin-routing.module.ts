import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingAdminPage } from './loading-admin.page';

const routes: Routes = [
  {
    path: '',
    component: LoadingAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingAdminPageRoutingModule {}
