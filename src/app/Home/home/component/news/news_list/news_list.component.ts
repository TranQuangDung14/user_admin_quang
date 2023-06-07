import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-news_list',
  templateUrl: './news_list.component.html',
  styleUrls: ['./news_list.component.css']
})
export class News_listComponent implements OnInit {
  min_price: number;
  max_price: number;
  min_area: number;
  max_area: number;
  preferred_gender: string;
  self_governance: boolean;
  wards_id: number;
  district_id: number;
  category_id: any;
  districts: any[] = [];
  wards: any[] = [];
  selectedDistrict: any;
  selectedWard: any;
  opt_price: number;
  selectedCategory: any;
  constructor(
    private admin: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private _router: ActivatedRoute
  ) { }
  news: any;
  ngOnInit() {
    this.fetchProducts();
    this.loadDistricts();
    this.get_all_index_news();
  }
  loadDistricts() {
    this.admin.getDistricts(33).subscribe((data: any) => {
      this.districts = data;
    });
  }

  loadWards(districtId: number) {
    this.district_id = districtId;
    this.admin.getWards(districtId).subscribe((data: any) => {
      this.wards = data;
    });
    this.fetchProducts();
  }

  selectWard(wardId: number) {
    this.wards_id = wardId;
    this.fetchProducts();
  }
  //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
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
  category:any;
  get_all_index_news() {
    this.admin.get_index_news().subscribe(
      (data: any) => {
        this.category=data.category;
        console.log(';ffff',this.category)
      });
    }
  fetchProducts() {
    console.log('ne',  this.min_area,  this.max_area)
    this.admin.getFilteredProducts(
      this.category_id,
      this.min_price,
      this.max_price,
      this.min_area,
      this.max_area,
      this.preferred_gender,
      this.self_governance,
      this.wards_id,
      this.district_id
    ).subscribe(data => {
      this.news = data;
      console.log('adad', this.news)
    }, error => {
      console.error('Error:', error);
    });
  }

  onFilterChange(categoryId: any, minPrice: number, maxPrice: number, minArea: number, maxArea: number, preferredGender: string, selfGovernance: boolean, wardsId: number, districtId: number) {
    this.category_id = categoryId;
    this.min_price = minPrice;
    this.max_price = maxPrice;
    this.min_area = minArea;
    this.max_area = maxArea;
    this.preferred_gender = preferredGender;
    this.self_governance = selfGovernance;
    this.wards_id = wardsId;
    this.district_id = districtId;
    console.log('dtaa',  districtId)
    this.fetchProducts();
  }
  // onFilterChange_price(minPrice: number, maxPrice: number) {
  //   this.min_price = minPrice;
  //   this.max_price = maxPrice;
  //   this.fetchProducts();
  // }
  updatePriceRange(option: number) {
    switch(option) {
      case 0: { this.min_price = 0; this.max_price = 99999999999; break; }
      case 1: { this.min_price = 0; this.max_price = 1000000; break; }
      case 2: { this.min_price = 1000000; this.max_price = 2000000; break; }
      case 3: { this.min_price = 2000000; this.max_price = 3000000; break; }
      case 4: { this.min_price = 3000000; this.max_price = 5000000; break; }
      case 5: { this.min_price = 5000000; this.max_price = 7000000; break; }
      case 6: { this.min_price = 7000000; this.max_price = 10000000; break; }
      case 7: { this.min_price = 10000000; this.max_price = 15000000; break; }
      case 8: { this.min_price = 15000000; this.max_price = 99999999999; break; }
    }
    console.log('updatePriceRange',option,this.min_price );
    this.fetchProducts();
  }

  getPriceRangeLabel(option: number): "Tất cả" | "Dưới 1 triệu" | "1 triệu - 2 triệu" | "2 triệu - 3 triệu" | "3 triệu - 5 triệu" | "5 triệu - 7 triệu" | "7 triệu - 10 triệu" | "10 triệu - 15 triệu" | "Trên 15 triệu" | undefined {
    switch(option) {
      case 0:
        return "Tất cả";
      case 1:
        return "Dưới 1 triệu";
      case 2:
        return "1 triệu - 2 triệu";
      case 3:
        return "2 triệu - 3 triệu";
      case 4:
        return "3 triệu - 5 triệu";
      case 5:
        return "5 triệu - 7 triệu";
      case 6:
        return "7 triệu - 10 triệu";
      case 7:
        return "10 triệu - 15 triệu";
      case 8:
        return "Trên 15 triệu";
      default:
        return undefined;
    }
  }


  areaOptions = [
    { value: 0, label: 'Diện tích ...' },
    { value: 1, label: 'Dưới 20 m2' },
    { value: 2, label: '20 - 30 m2' },
    { value: 3, label: '30 - 50 m2' },
    { value: 4, label: '50 - 60 m2' },
    { value: 5, label: '60 - 70 m2' },
    { value: 6, label: '70 - 80 m2' },
    { value: 7, label: '80 - 100 m2' },
    { value: 8, label: 'Trên 100 m2' }
  ];

  opt_area: number;

  // Các thuộc tính khác của bạn...

  updateAreaRange(option: number) {
    switch (option) {
      case 0: { this.min_area = 0; this.max_area = 99999999999; break; }
      case 1: { this.min_area = 0; this.max_area = 20; break; }
      case 2: { this.min_area = 20; this.max_area = 30; break; }
      case 3: { this.min_area = 30; this.max_area = 50; break; }
      case 4: { this.min_area = 50; this.max_area = 60; break; }
      case 5: { this.min_area = 60; this.max_area = 70; break; }
      case 6: { this.min_area = 70; this.max_area = 80; break; }
      case 7: { this.min_area = 80; this.max_area = 100; break; }
      case 8: { this.min_area = 100; this.max_area = 99999999999; break; }
    }
    console.log('option', option, this.min_area);
    this.fetchProducts();
  }
 // Hàm lọc theo danh mục
 filterByCategory(category: string) {
  this.category_id = category;
  this.fetchProducts();
}
}
