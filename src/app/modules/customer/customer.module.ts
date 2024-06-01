import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { XacThucKhachHangComponent } from './xac-thuc-khach-hang/xac-thuc-khach-hang.component';
import {Button} from "primeng/button";


@NgModule({
  declarations: [
    XacThucKhachHangComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    Button
  ]
})
export class CustomerModule { }
