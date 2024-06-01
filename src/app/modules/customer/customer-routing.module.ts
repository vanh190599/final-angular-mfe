import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {XacThucKhachHangComponent} from "./xac-thuc-khach-hang/xac-thuc-khach-hang.component";

const routes: Routes = [
  {
    path: '',
    component: XacThucKhachHangComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
