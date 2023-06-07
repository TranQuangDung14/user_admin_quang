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
  news_detail:any;
  imgage_all:any[]=[];
  mainImage: any;
  ngOnInit() {
    this.get_detail();
  }

 get_detail() {
  this.id = this._router.snapshot.params['id'];
  console.log('lấy id này',this.id);
  this.admin.get_detail(this.id).subscribe((data: any) => {
    this.imgage_all = data[0].images;
    this.mainImage = this.imgage_all[0];
    this.news_detail = data[0];
    console.log('heheh');
    console.log('detail',this.news_detail)
  })

}
setMainImage(index: number) {
  this.mainImage = this.imgage_all[index];
}
}
