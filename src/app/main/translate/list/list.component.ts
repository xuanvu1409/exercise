import {Component, ElementRef, Input, OnInit} from '@angular/core';
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
  clList:any[] = [];
  screen: Number = 1;
  arrIndex:any[] = [];
  index:number = 0;

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
    this.getNote()
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

  getNote = () => {
    this.index = 0;
    this.route.params.subscribe(params => {

      let elem = this.el.nativeElement.querySelector(".p-dropdown-clear-icon");
      if (elem) {
        elem.click();
      }
      this.translateService.getNote(params.categoryId).subscribe((res:any) => {
        this.list = res;
        this.clList = res;
        this.arrIndex = this.convertArr(res.length);
        this.saveLocal(res);
      })
    })
  }

  saveLocal = (arr:any[]) => {
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

  randomIndex = (number: number) => {
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

  changeIndex = (value: boolean) => {
    if (value) {
      this.index += 1;
    } else {
      this.index -= 1;
    }
  }
}
