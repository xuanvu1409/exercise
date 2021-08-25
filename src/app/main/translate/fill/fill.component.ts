import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html',
  styleUrls: ['./fill.component.css'],
  providers: [ConfirmationService]
})
export class FillComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  index: number = 0;
  @Input() arrIndex: any[] = [];
  @Input() convertArr: any;
  value: number = 100;
  chars: any[] = [];
  buttons: string[] = [];
  indexButtons: any[] = [];
  indexChar: number = 0;


  constructor(
    private el: ElementRef,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.countDown();
    this.randomShow(this.data[this.arrIndex[this.index]].name);
  }

  countDown = () => {
    this.value = 100;
    let time = setInterval(() => {
      this.value -= 1;
      if (this.value == 0 && this.index < this.data.length) {
        clearInterval(time);
        this.confirmationService.confirm({
          message: 'Rất tiếc đã hết thời gian, bạn có muốn chơi lại không?',
          header: 'Thất bại',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.index = 0;
            this.countDown();
            this.randomShow(this.data[this.arrIndex[this.index]].name);
          },
          reject: () => {
            this.router.navigate(['/translate'])
          }
        });
      }
    }, 400)
  }

  randomShow = (name: string) => {
    this.chars = name.split('').filter((value: string) => value.trim() != "").map((value: string) => ({
      char: value,
      show: false
    }));
    this.chars[Math.floor(Math.random() * (this.chars.length - 1))].show = true;
    this.randomBtn();
  }

  randomBtn = () => {
    let arrIndex: number[] = [];
    let buttons: string[] = [];
    this.chars.map(value => (
      buttons.indexOf(value.char) == -1 && buttons.push(value.char)
    ))
    while (arrIndex.length < 3) {
      let randomIndex = Math.floor(Math.random() * this.data.length);
      if (arrIndex.indexOf(randomIndex) == -1 && randomIndex != this.index) {
        arrIndex.push(randomIndex)
        let newArrName = this.data[randomIndex].name.split('').filter((value: string) => value.trim() != "");
        let newNameUni = newArrName.filter((value: string) => buttons.indexOf(value) == -1);
        buttons = [...buttons, ...newNameUni]
      }
    }
    this.buttons = buttons;
    this.randomIndex(this.buttons)
  }

  randomIndex = (buttons: any[]) => {
    this.indexButtons = [];
    let number = buttons.length;
    let arr = this.convertArr(number);
    let j = 0;
    let result = [];
    while (number--) {
      j = Math.floor(Math.random() * arr.length);
      this.indexButtons.push(arr[j]);
      arr.splice(j, 1);
    }
  }

  selectButton = (event: any, value: any) => {
    if (this.chars.filter(value => value.show == false)[0].char == value) {
      let arrBtn = this.el.nativeElement.querySelectorAll(".btn-danger");
      if (arrBtn) {
        for (let i = 0; i < arrBtn.length; i++) {
          arrBtn[i].classList.remove('btn-danger');
        }
      }
      this.chars.filter(value => value.show == false)[0].show = true;
    } else {
      event.target.classList.add("btn-danger");
    }
    if (this.chars.filter(value => value.show == false).length == 0) {
      this.countDown();
      this.index += 1;
      if (this.index == this.data.length) {
        this.confirmationService.confirm({
          message: 'Bạn đã hoàn thành tất cả câu hỏi, bạn có muốn chơi lại không?',
          header: 'Thành công',
          icon: 'pi pi-check',
          accept: () => {
            this.index = 0;
            this.countDown();
            this.randomShow(this.data[this.arrIndex[this.index]].name);
          },
          reject: () => {
            this.router.navigate(['/translate'])
          }
        });
      }
      this.randomShow(this.data[this.arrIndex[this.index]]?.name);
    }
  }

}
