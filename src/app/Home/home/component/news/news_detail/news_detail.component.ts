import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-news_detail',
  templateUrl: './news_detail.component.html',
  styleUrls: ['./news_detail.component.css']
})
export class News_detailComponent implements OnInit {

  constructor(
    private admin: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private _router: ActivatedRoute
  ) { }
  id: number = 0;
  news_detail: any;
  imgage_all: any[] = [];
  mainImage: any;
  isSaved = false; // Biến để kiểm tra bài viết đã được lưu hay chưa
  newsId: any;
  ngOnInit() {
    this.get_detail();
    this.checkIfSaved();
  }
  checkIfSaved(): void {
    this.admin.get_save_news().subscribe(res => {
      // Kiểm tra xem `newsId` có tồn tại trong danh sách bài viết đã lưu hay không
      this.newsId = this._router.snapshot.paramMap.get('id');
      this.isSaved = res.some((news: any) => news.news_id ==  this.newsId );
    }, err => {
      console.error(err);
    });
  }
  get_detail() {
    this.id = this._router.snapshot.params['id'];
    console.log('lấy id này', this.id);
    this.admin.get_detail(this.id).subscribe((data: any) => {
      this.imgage_all = data[0].images;
      this.mainImage = this.imgage_all[0];
      this.news_detail = data[0];
      console.log('heheh');
      console.log('detail', this.news_detail)
    })

  }
  get_save_new() {

  }
  setMainImage(index: number) {
    this.mainImage = this.imgage_all[index];
  }
  toggleSave(newsId: string): void {
    if (this.isSaved) {
      this.admin.cancel_save_news(newsId).subscribe(res => {
        this.isSaved = false;
        this.toastr.success('Hủy lưu tin thành công!');
        this.checkIfSaved(); // Kiểm tra lại sau khi hủy lưu
      }, err => {
        console.error(err);
        this.toastr.error('Hủy lưu tin thất bại!');
      });
    } else {
      this.admin.save_news({ news_id: newsId }).subscribe(res => {
        this.isSaved = true;
        this.toastr.success('Lưu tin thành công!');
        this.checkIfSaved(); // Kiểm tra lại sau khi lưu
      }, err => {
        console.error(err);
        this.toastr.error('Lưu tin thất bại!');
      });
    }
  }

}
