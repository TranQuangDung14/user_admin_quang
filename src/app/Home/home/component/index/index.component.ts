import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
  private subscription: Subscription;
  constructor(
    private admin: ApiService,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.get_all_index_news()
  }
  news_all_1:any;
  news_all_2:any;
  news_all_3:any;
  get_all_index_news() {
    this.subscription = this.admin.get_index_news().subscribe(
      (data: any) => {
        this.news_all_1 = data.news_all_1;
        this.news_all_2 = data.news_all_2;
        this.news_all_3 = data.news_all;
        console.log('tin',this.news_all_1);
        console.log('tin 2',this.news_all_2);
        console.log('tin 3',data.news_all);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [5, 10, 15, 20];
  //phân trang
  ontableDataChange(event: any) {
    this.page = event;
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  page2: number = 1;
  count2: number = 0;
  tableSize2: number = 5;
  tableSizes2: any = [5, 10, 15, 20];
  //phân trang
  ontableDataChange2(event2: any) {
    this.page2 = event2;
  }
  ontableSizeChange2(event2: any): void {
    this.tableSize2 = event2.target.value;
    this.page2 = 1;
  }

}
