import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit {
  @ViewChild('slider', {static: false}) slider: any;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.slider.nativeElement.childNodes.length > 1) {
      this.slider.nativeElement.childNodes[0].classList.add('d-block');
      this.slider.nativeElement.appendChild(this.createDot(this.slider.nativeElement.childNodes.length));
    }
  }

  createDot = (number: number): HTMLElement => {
    let dots = document.createElement("div");
    dots.className = "slider__dots";
    for (let i = 0; i < number; i++) {
      let dot = document.createElement("div");
      dot.className = i == 0 ? "slider__dot active" : "slider__dot";
      dot.onclick = () => {
        this.changeSlider(i);
      }
      dots.appendChild(dot);
    }
    return dots;
  }

  changeSlider = (index: any) => {
    let dots = this.el.nativeElement.querySelectorAll(".slider__dot");
    let sliders = this.el.nativeElement.querySelectorAll(".slider > img");
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
      sliders[i].classList.remove('d-block');
    }
    dots[index].classList.add('active');
    sliders[index].classList.add('d-block');
  }

}
