import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {
  @Input() list:any = [];
  index: any = 0;
  options:any[] = [{
    label: "Tất cả",
    value: 0
  }, {
    label: "Chưa nhớ",
    value: 1,
  }, {
    label: "Đã nhớ",
    value: 2
  }];

  constructor() { }

  ngOnInit(): void {
  }

  changeIndex = (status) => {
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

}
