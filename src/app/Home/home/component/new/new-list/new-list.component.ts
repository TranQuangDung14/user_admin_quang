import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  private subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private admin: ApiService,
    private router: Router,
    private toastr: ToastrService,
  ) { }
  news_list: any;
  ngOnInit() {
    this.get_all_news();
  }
  get_all_news() {
    this.subscription = this.admin.get_all_news_list()
      .subscribe((data: any) => {
        this.news_list=data;

        console.log('san pham', this.news_list);
        
      }, error => {
        console.log(error);

      }
      )
  }
  onDelete(id: number) {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa tin này?');
    if (confirmed) {
      this.admin.delete_news(id).subscribe(
        (data) => {
          this.get_all_news();
          this.toastr.success('Xóa thành công!');
        },
        (error) => {
          console.log('Lỗi:', error);
          this.toastr.error('Xóa thất bại!');
        }
      );
    }
  }
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  //phân trang
  ontableDataChange(event: any) {
    this.page = event;

  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
