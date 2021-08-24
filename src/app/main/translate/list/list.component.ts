import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "../../../services/translate.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() data: any = '';
  displayModal: boolean = false;
  item: any = {};
  list: any[] = [];
  screen: Number = 1;
  arrIndex: any[] = [];
  listCl:any[] = [];

  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private el: ElementRef
  ) {
  }

  ngOnInit(): void {
    let dataLocal = JSON.parse(<string>localStorage.getItem('data2'));
    if (!dataLocal) {
      localStorage.setItem('data2', JSON.stringify([]));
    }

    this.route.params.subscribe(params => {
      this.resetDrop();
      this.getNote(params.categoryId).subscribe((res: any) => {
        this.list = res;
        this.listCl = res;
        this.arrIndex = this.convertArr(res.length);
        this.saveLocal(res);
      });
    })
  }

  iconType = (str: String) => {
    if (!str) {
      return "U";
    }
    return str.substr(0, 1).toUpperCase();
  }

  show = (item: Object) => {
    this.item = item;
    this.displayModal = true;
  }

  getNote = (categoryId: number) => {
    return this.translateService.getNote(categoryId);
  }

  saveLocal = (arr: any[]) => {
    let dataLocal = JSON.parse(<string>localStorage.getItem('data2'));
    let newArr = dataLocal.map((value: { id: any; }) => value.id);
    let idList = arr.map(value => value.id);
    let idUni = idList.filter(value => newArr.indexOf(value) == -1);
    let newData = idUni.map(value => ({id: value, remember: false}))
    localStorage.setItem('data2', JSON.stringify([...dataLocal, ...newData]))
  }

  convertArr = (number: number) => {
    let arr = [];
    for (let i = 0; i < number; i++) {
      arr.push(i);
    }
    return arr;
  }

  resetDrop = () => {
    let elem = this.el.nativeElement.querySelector(".p-dropdown-clear-icon");
    if (elem) {
      elem.click();
    }
  }
}
