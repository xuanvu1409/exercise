import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {
  index: number = 0;
  @Input() arrIndex: any[] = [];
  @Input() list: any[] = [];
  @Input() listCl: any[] = [];
  @Input() convertArr: any = {};
  options: any[] = [{
    label: "Tất cả",
    value: 0
  }, {
    label: "Chưa nhớ",
    value: 2,
  }, {
    label: "Đã nhớ",
    value: 1
  }];

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.index = 0;
    })
  }

  changeIndex = (status: boolean) => {
    let fBox = document.querySelector(".flip-box");
    if (fBox) {
      fBox.classList.remove("active");
    }
    if (status) {
      this.index += 1;
    } else {
      this.index -= 1;
    }
  }

  show = () => {
    let fBox = document.querySelector(".flip-box");
    if (fBox) {
      fBox.classList.toggle("active");
    }
  }

  checkRemember = (id: number) => {
    let data = JSON.parse(<string>localStorage.getItem('data2'));
    if (!data) {
      localStorage.setItem('data2', JSON.stringify([]))
      return false
    } else {
      let result = data.filter((value: { id: Number; }) => value.id == id)[0];
      return !!result?.remember;
    }
  }

  remember = (id: number) => {
    let data = JSON.parse(<string>localStorage.getItem('data2'));
    let item = data.filter((value: { id: Number; }) => value.id == id)[0];
    if (!item) {
      localStorage.setItem('data2', JSON.stringify([...data, {id, remember: true}]))
    }
    data[data.indexOf(item)] = {id, remember: !data[data.indexOf(item)].remember};
    localStorage.setItem('data2', JSON.stringify(data));
    return data[data.indexOf(item)]?.remember;
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
  }

  changeStatus = (event: any) => {
    this.index = 0;
    let dataLocal = JSON.parse(<string>localStorage.getItem('data2'));
    this.list = this.listCl;
    let arr: any[] = [];
    if (event.value == 1) {
      dataLocal.map((e: any) => {
        this.list.map((value: { id: any; }) => {
          if (e.id == value.id && e.remember == true) {
            arr.push(value)
          }
        })
      })
      this.list = arr;
    } else if (event.value == 2) {
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
  }

}
