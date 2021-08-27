import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {TableComponent} from "./table/table.component";
import { DetailComponent } from './table/detail/detail.component';
import { TranslateComponent } from './translate/translate.component';
import {CardModule} from "primeng/card";
import {TranslateModule} from "./translate/translate.module";
import { VoiceComponent } from './voice/voice.component';
import {VoiceModule} from "./voice/voice.module";


@NgModule({
  declarations: [
    TableComponent,
    DetailComponent,
    TranslateComponent,
    VoiceComponent
  ],
  exports: [
    TableComponent
  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        TableModule,
        DropdownModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        RippleModule,
        ReactiveFormsModule,
        CardModule,
        TranslateModule,
        VoiceModule
    ]
})
export class MainModule { }
