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
        // console.log(data.category_product);

        // this.product = data.product;
        // this.category_product = data.category_product;
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
}
