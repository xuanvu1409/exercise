import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {
  @Input() list: any[] = [];
  @Input() arrIndex: any[] = [];
  @Input() index: any = 0;
  @Output() setIndex = new EventEmitter();
  @Output() setStatus = new EventEmitter();
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

  constructor() {
  }

  ngOnInit(): void {
  }

  changeIndex = (status: boolean) => {
    let fBox = document.querySelector(".flip-box");
    if (fBox) {
      fBox.classList.remove("active");
    }
    this.setIndex.emit(status);
  }

  changeStatus = (event:any) => {
    this.setStatus.emit(event.value)
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

}
