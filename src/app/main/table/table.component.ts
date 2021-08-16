import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ConfirmationService } from 'primeng/api';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataSource: any[] = [];
  status = [
    {
      name: 'Chưa hoàn thành', value: 0
    },
    {
      name: 'Đã hoàn thành', value: 1
    }
  ];
  value: any;
  time: any;
  cols: any[] = [];
  displayModal = false;
  // @ts-ignore
  form: FormGroup;
  submitted = false;
  addOrEdit: boolean | undefined;
  editItem: any;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tenDanhMuc: ['', [Validators.required]],
      thoiGian: ['', [Validators.required]],
    })

    this.loadData();
  }

  handleClick = () => {
    this.addOrEdit = true;
    this.displayModal = true;
    this.form.reset();
  }

  loadData = () => {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify([]))
    } else {
      // @ts-ignore
      this.dataSource = JSON.parse(localStorage.getItem("data"));
    }
  }

  onSubmit = () => {
    this.submitted = true;
    if (this.form?.invalid) {
      return;
    }
    if (this.addOrEdit) {
      localStorage.setItem('data', JSON.stringify([...this.dataSource, {...this.form.value, trangThai: 0}]));
      this.displayModal = false;
      this.loadData();
      this.submitted = false;
    } else {
      this.dataSource[this.editItem] = {...this.form.value, trangThai: this.dataSource[this.editItem].trangThai}
      localStorage.setItem('data', JSON.stringify(this.dataSource));
      this.displayModal = false;
      this.loadData()
      this.submitted = false;
    }
  }

  edit = (index: any) => {
    this.addOrEdit = false;
    this.displayModal = true;
    this.editItem = index;
    this.form.patchValue({
      tenDanhMuc: this.dataSource[index].tenDanhMuc,
      thoiGian: this.dataSource[index].thoiGian
    })
  }

  filter = (event: any) => {
    let data = JSON.parse(<string>localStorage.getItem("data"));
    this.dataSource = data.filter((e: { trangThai: any; }) => e.trangThai == event.value);
  }

  delete = (index: any) => {
    this.dataSource.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(this.dataSource));
  }

  changeStatus = (index:any) => {
    this.dataSource[index].trangThai = 1;
    localStorage.setItem('data', JSON.stringify(this.dataSource));
  }
}
