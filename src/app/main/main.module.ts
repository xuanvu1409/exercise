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


@NgModule({
  declarations: [
    TableComponent,
    DetailComponent
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
    ReactiveFormsModule
  ]
})
export class MainModule { }
