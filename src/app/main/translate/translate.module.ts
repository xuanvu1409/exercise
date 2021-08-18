import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateRoutingModule } from './translate-routing.module';
import { ListComponent } from './list/list.component';
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import { FlashcardComponent } from './flashcard/flashcard.component';
import {DropdownModule} from "primeng/dropdown";
import {RippleModule} from "primeng/ripple";


@NgModule({
  declarations: [
    ListComponent,
    FlashcardComponent
  ],
  exports: [
    ListComponent,
    FlashcardComponent
  ],
  imports: [
    CommonModule,
    TranslateRoutingModule,
    DialogModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    RippleModule
  ]
})
export class TranslateModule { }
