import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "../../../services/translate.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() data:any = '';
  displayModal:boolean = false;
  item:any = {};
  list:any[] = [];
  screen: Number = 1;
  arrIndex:any[] = [];
  index:number = 0;

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
    this.index = 0;
    this.translateService.getNote(id).subscribe((res:any) => {
      this.list = res;
      this.arrIndex = this.convertArr(res.length);
    })
  }

  convertArr = (number) => {
    let arr = [];
    for (let i = 0; i < number; i++) {
      arr.push(i);
    }
    return arr;
  }

  randomIndex = (number) => {
    this.index = 0;
    this.arrIndex = [];
    let arr = this.convertArr(number);
    let j = 0;
    let result = [];
    while (number--) {
      j = Math.floor(Math.random() * arr.length);
      this.arrIndex.push(arr[j]);
      arr.splice(j,1);
    }
  }

  changeIndex = (value) => {
    if (value) {
      this.index += 1;
    } else {
      this.index -= 1;
    }
  }
}
