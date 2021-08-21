import {Component, ElementRef, Input, OnInit} from '@angular/core';
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
  index: number = 0;
  flashcard: any = {};
  categoryId: number = 0;
  quantity: number = 0;
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
      this.categoryId = params.categoryId;
      this.resetDrop();
      this.getNote(params.categoryId).subscribe((res: any) => {
        this.list = res;
        this.listCl = res;
        this.arrIndex = this.convertArr(res.length);
        this.loadFlashcard();
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
    this.index = 0;
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

  randomIndex = () => {
    let number = this.list.length;
    this.arrIndex = [];
    this.index = 0;
    let arr = this.convertArr(number);
    let j = 0;
    let result = [];
    while (number--) {
      j = Math.floor(Math.random() * arr.length);
      this.arrIndex.push(arr[j]);
      arr.splice(j, 1);
    }

    this.loadFlashcard();
  }

  loadFlashcard = () => {
    this.quantity = this.list.length;
    this.flashcard = this.list[this.arrIndex[this.index]];
  }

  changeIndex = (value: boolean) => {
    if (value) {
      this.index += 1;
    } else {
      this.index -= 1;
    }
    this.loadFlashcard()
  }

  changeStatus = (value: number) => {
    this.index = 0;
    let dataLocal = JSON.parse(<string>localStorage.getItem('data2'));
    this.list = this.listCl;
    let arr: any[] = [];
    if (value == 1) {
      dataLocal.map((e: any) => {
        this.list.map((value: { id: any; }) => {
          if (e.id == value.id && e.remember == true) {
            arr.push(value)
          }
        })
      })
      this.list = arr;
    } else if (value == 2) {
      dataLocal.map((e: any) => {
        this.list.map((value: { id: any; }) => {
          if (e.id == value.id && e.remember == false) {
            arr.push(value)
          }
        })
      })
      this.list = arr;
    }
    this.arrIndex = this.convertArr(this.list.length);
    this.loadFlashcard();
  }

}
