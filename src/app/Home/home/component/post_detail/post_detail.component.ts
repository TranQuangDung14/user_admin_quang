import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
@Component({
  selector: 'app-post_detail',
  templateUrl: './post_detail.component.html',
  styleUrls: ['./post_detail.component.css']
})
export class Post_detailComponent implements OnInit {

  constructor(
    private admin: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private _router: ActivatedRoute
  ) { }
  id: number = 0;
  post_detail:any;
  ngOnInit() {
    this.get_post_detail();
  }

  get_post_detail() {
  this.id = this._router.snapshot.params['id'];
  console.log('lấy id này',this.id);
  this.admin.get_post_detail(this.id).subscribe((data: any) => {
    this.post_detail = data.posts[0];
    console.log('heheh');
    console.log('detail',this.post_detail)
  })

}

}
