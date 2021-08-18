import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "../../../services/translate.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayModal:boolean = false;
  item:any = {};
  list:any[] = [];
  screen: Number = 1;

  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getNote(params.categoryId)
    })
  }

  iconType = (str:String) => {
    if (!str) {
      return "U";
    }
    return str.substr(0, 1).toUpperCase();
  }

  show = (item: Object) => {
    this.item = item;
    this.displayModal = true;
  }

  getNote = (id) => {
    this.translateService.getNote(id).subscribe((res:any) => {
      this.list = res;
    })
  }
}
