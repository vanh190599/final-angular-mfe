import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'example',
    loadChildren: () => import('./modules/example/example.module')
      .then(m => m.ExampleModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/search/search.module')
      .then(m => m.SearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
