import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.css']
})
export class SingerComponent implements OnInit {
  @ViewChild('boxSinger', {static: false}) boxSinger: any;
  isDown: boolean = false;
  startX: number = 0;
  scrollLeft:any;

  constructor(
  ) { }

  ngOnInit(): void {
  }


  onMouseDown = (event: any) => {
    this.isDown = true;
    this.boxSinger.nativeElement.classList.add('active');
    this.startX = event.pageX - this.boxSinger.nativeElement.offsetLeft;
    this.scrollLeft = this.boxSinger.nativeElement.scrollLeft;
  }

  onMouseLeave = () => {
    this.isDown = false;
    this.boxSinger.nativeElement.classList.remove('active');
  }

  onMouseUp = () => {
    this.isDown = false;
    this.boxSinger.nativeElement.classList.remove('active');
  }

  onMouseMove = (event: any) => {
    if (!this.isDown) return;
    event.preventDefault();
    const x = event.pageX - this.boxSinger.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.boxSinger.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

}
