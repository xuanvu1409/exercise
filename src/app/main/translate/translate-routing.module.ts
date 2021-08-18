import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TranslateComponent} from "./translate.component";
import {ListComponent} from "./list/list.component";

const routes: Routes = [
  {
    path: '',
    component: TranslateComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: ':categoryId',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslateRoutingModule { }
