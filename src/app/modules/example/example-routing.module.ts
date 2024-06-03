import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainExampleComponent} from "./main-example/main-example.component";

const routes: Routes = [
  {
    path: '',
    component: MainExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule {
}
