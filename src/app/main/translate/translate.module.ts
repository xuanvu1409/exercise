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
import { FillComponent } from './fill/fill.component';
import {ProgressBarModule} from "primeng/progressbar";
import {ConfirmDialogModule} from "primeng/confirmdialog";


@NgModule({
  declarations: [
    ListComponent,
    FlashcardComponent,
    FillComponent
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
    RippleModule,
    ProgressBarModule,
    ConfirmDialogModule
  ]
})
export class TranslateModule { }
