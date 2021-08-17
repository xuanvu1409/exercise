import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  nameUnique: String = "";

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tenDanhMuc: ['', [Validators.required]],
      thoiGian: ['', [Validators.required]],
    }, {validator: this.uniqueValidator()})

    this.loadData();
  }

  handleClick = () => {
    this.submitted = false;
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

  uniqueValidator() {
    return (formGroup: FormGroup) => {
      // @ts-ignore
      let tenDanhMuc = formGroup.controls['tenDanhMuc'];
      let thoiGian = formGroup.controls['thoiGian'];

      if (tenDanhMuc.errors) {
        return;
      }
      const isNameUnique = this.dataSource.map(data => data.tenDanhMuc).some(value => value === tenDanhMuc.value);
      const isTimeUnique = this.dataSource.map(data => data.thoiGian).some(value => value === thoiGian.value);
      if (this.addOrEdit) {
        if (isNameUnique) {
          // @ts-ignore
          tenDanhMuc.setErrors({unique: true});
        }
      } else {
          let nameUni = this.dataSource.filter(e => e.tenDanhMuc !== this.nameUnique).some(value => value.tenDanhMuc !== tenDanhMuc.value)

          if (!nameUni) {
            tenDanhMuc.setErrors({unique: true});
          }
      }
    };
  }

  onSubmit = () => {
    this.submitted = true;
    if (this.form?.invalid) {
      return;
    }
    this.loadData();
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
    this.submitted = false;
    this.addOrEdit = false;
    this.displayModal = true;
    this.editItem = index;
    this.nameUnique = this.dataSource[index].tenDanhMuc;
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
    this.loadData()
    this.dataSource.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(this.dataSource));
  }

  changeStatus = (index: any) => {
    this.dataSource[index].trangThai = 1;
    localStorage.setItem('data', JSON.stringify(this.dataSource));
  }
}
