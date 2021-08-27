import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./main/home/home.component";
import {NotFoundComponent} from "./main/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'work',
    loadChildren: () => import("./main/main.module").then(m => m.MainModule)
  },
  {
    path: 'translate',
    loadChildren: () => import("./main/translate/translate.module").then(m => m.TranslateModule)
  },
  {
    path: 'voice',
    loadChildren: () => import("./main/voice/voice.module").then(m => m.VoiceModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
