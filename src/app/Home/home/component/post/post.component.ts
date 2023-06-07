import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  private subscription: Subscription;
  constructor(
    private admin: ApiService,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.get_all_index_posts()
  }
  posts:any;
  get_all_index_posts() {
    this.subscription = this.admin.get_index_posts().subscribe(
      (data: any) => {
        this.posts = data.posts;

        console.log('tin',this.posts);

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
    // this.get_all_voucher();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.get_all_voucher();
  }

}
