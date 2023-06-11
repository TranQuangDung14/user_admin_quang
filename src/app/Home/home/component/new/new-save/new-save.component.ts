import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-new-save',
  templateUrl: './new-save.component.html',
  styleUrls: ['./new-save.component.css']
})
export class NewSaveComponent implements OnInit {

  constructor(
    private admin: ApiService,
  ) { }
  news_save: any;
  ngOnInit() {
    this.get_save_news();
  }
  get_save_news() {
    this.admin.get_save_news().subscribe(res => {
      this.news_save = res;
      console.log('this', this.news_save);
    }, err => {
      console.error(err);
    });
  }
  page: number = 1;
  count: number = 0;
  tableSize: number = 12;
  tableSizes: any = [5, 10, 15, 20];
  //phân trang
  ontableDataChange(event: any) {
    this.page = event;
    // this.get_all_voucher();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.get_all_voucher();
  }
}
