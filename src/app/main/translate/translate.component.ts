import { Component, OnInit } from '@angular/core';
import {TranslateService} from "../../services/translate.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  folders: any[] = [];
  data:any = [];

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getFolder();
  }

  getFolder = () => {
    this.translateService.getFolder().subscribe((res:any) => {
      this.route.params.subscribe(params => {
        if (Object.keys(params).length == 0) {
          this.router.navigate(['/translate', res[0].categoryId])
        }
      })
      this.folders = res;
    })
  }

}
