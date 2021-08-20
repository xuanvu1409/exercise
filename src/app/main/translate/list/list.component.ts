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

  getNote = (id: number) => {
    this.index = 0;
    this.translateService.getNote(id).subscribe((res:any) => {
      this.list = res;
      this.arrIndex = this.convertArr(res.length);
      this.saveLocal(res);
    })
  }

  saveLocal = (arr:any[]) => {
    let dataLocal = JSON.parse(<string>localStorage.getItem('data2'));
    if (this.list) {
      !dataLocal ? localStorage.setItem('data2', JSON.stringify([])) : dataLocal;
      let idData = dataLocal?.map((value: { id: number; }) => value.id);
      let data = this.list.map(value => value.id);
      let idUni = data.filter(value => idData?.indexOf(value) == -1);
      let newData = idUni.map(value => ({id: value, remember: false}));
      localStorage.setItem('data2', JSON.stringify([...dataLocal, ...newData]))
    }
  }

  changeStatus = (value:number) => {
    this.index = 0;
    let dataLocal = JSON.parse(<string>localStorage.getItem('data2'));
    let arr: any[] = [];
    this.route.params.subscribe(params => {
      this.translateService.getNote(params.categoryId).subscribe((res:any) => {
        if (value == 1) {
          dataLocal.map((e:any) => {
            res.map((value: { id: any; }) => {
              if (e.id == value.id && e.remember == true) {
                arr.push(value)
              }
            })
          })
          this.list = arr;
        } else if (value == 2) {
          dataLocal.map((e:any) => {
            res.map((value: { id: any; }) => {
              if (e.id == value.id && e.remember == false) {
                arr.push(value)
              }
            })
          })
          this.list = arr;
        } else {
          this.list = res;
        }
      })
    })

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
