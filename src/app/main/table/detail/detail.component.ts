import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  status = [
    {
      name: 'Chưa hoàn thành', value: 0
    },
    {
      name: 'Đã hoàn thành', value: 1
    }
  ];
  id: String = "";
  data: any[] = [];
  workDetail: any = {};
  orther: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData = () => {
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (!localStorage.getItem('data')) {
        localStorage.setItem('data', JSON.stringify([]))
      } else {
        this.data = JSON.parse(localStorage.getItem('data') || '{}');
        this.workDetail = this.data.filter(value => value.id === this.id)[0];
        if (!this.workDetail) {
          this.router.navigate(['/work']);
        }
        this.orther = this.data.filter(value => value.id != this.id);
      }
    });
  }

}
