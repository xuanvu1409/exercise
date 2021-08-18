import { Component, OnInit } from '@angular/core';
import {TranslateService} from "../../services/translate.service";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  folders: any[] = [];
  data:any = [];
  screen: Number = 1;

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getFolder();
  }

  getFolder = () => {
    this.translateService.getFolder().subscribe((res:any) => {
      this.folders = res;
      this.getNote(res[0].categoryId[0])
    })
  }

  changeFolder = (event: any = {}, id) => {
    this.screen = 1;
    if (event) {
      let navActive = document.getElementsByClassName('active')[0];
      if (navActive) {
        navActive.classList.remove('active');
      }
      event.target.classList.add('active');
    }

    this.getNote(id);
  }

  getNote = (id) => {
    this.translateService.getNote(id).subscribe((res:any) => {
      this.data = res;
      console.log(res)
    })
  }

}
