import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {SearchComponent} from './search-component/search.component';

// ng zorro
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from "ng-zorro-antd/breadcrumb";
import {NzIconDirective, NzIconModule} from "ng-zorro-antd/icon";
import {NzFormControlComponent, NzFormDirective, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzCardComponent, NzCardTabComponent} from "ng-zorro-antd/card";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzRadioComponent, NzRadioGroupComponent} from "ng-zorro-antd/radio";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputDirective, NzInputGroupComponent, NzTextareaCountComponent} from "ng-zorro-antd/input";
import {NzDatePickerComponent, NzRangePickerComponent} from "ng-zorro-antd/date-picker";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {
  NzCellAlignDirective,
  NzCellFixedDirective,
  NzTableComponent, NzTableModule,
  NzTdAddOnComponent,
  NzThMeasureDirective, NzThSelectionComponent
} from "ng-zorro-antd/table";
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzLayoutModule
} from "ng-zorro-antd/layout";
import {RouterModule, Routes} from "@angular/router";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from "ng-zorro-antd/menu";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzSwitchComponent} from "ng-zorro-antd/switch";

export const Route: Routes = [
  {
    path: '',
    component: SearchComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    RouterModule.forChild(Route),
    CommonModule,
    NzLayoutComponent,
    NzHeaderComponent,
    NzFlexDirective,
    NzContentComponent,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzIconDirective,
    NzCardComponent,
    NzRowDirective,
    NzFormLabelComponent,
    NzSpaceComponent,
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
    NzInputDirective,
    NzRangePickerComponent,
    NzDatePickerComponent,
    NzInputNumberComponent,
    NzButtonComponent,
    NzTableComponent,
    NzThMeasureDirective,
    NzCellAlignDirective,
    NzCellFixedDirective,
    NzTdAddOnComponent,
    NzFooterComponent,
    NzSpaceItemDirective,
    NzLayoutModule,
    NgOptimizedImage,
    NzColDirective,
    NzRadioGroupComponent,
    NzRadioComponent,
    NzFormDirective,
    NzFormControlComponent,
    NzSelectComponent,
    NzOptionComponent,
    ReactiveFormsModule,
    NzInputGroupComponent,
    NzIconModule,
    NzFlexDirective,
    NzThSelectionComponent,
    NzTdAddOnComponent,
    NzTableModule,
    NzInputNumberComponent,
    NzPaginationComponent,
    NzMenuItemComponent,
    NzMenuDirective,
    NzSubMenuComponent,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzCardTabComponent,
    NzTabSetComponent,
    NzTabComponent,
    NzCheckboxComponent,
    NzTextareaCountComponent,
    NzTypographyComponent,
    NzSwitchComponent,
  ]
})
export class SearchModule {
}
