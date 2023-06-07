import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.css']
})
export class NewEditComponent implements OnInit {
  private subscription: Subscription;
  newsForm: FormGroup;
  imageFiles: File[] = [];
  category_product: any;
  news: any;
  id: number;
  brand:any;
  images: any;
  data = [];
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;
  constructor(
    private formBuilder: FormBuilder,
    private admin: ApiService,
    private _router: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.id = this._router.snapshot.params['id'];
    this.newsForm = this.formBuilder.group({
      name: ['', Validators.required],
      default_price: ['', Validators.required],
      room_area: ['', Validators.required],
      at_maximum: ['', Validators.required],
      total_room: ['', Validators.required],
      preferred_gender: ['', Validators.required],
      self_governance: ['', Validators.required],
      host: ['', Validators.required],
      phone: ['', Validators.required],
      // price: ['', Validators..],
      // tech_specs: [''],
      category_id: ['',Validators.required],
      address: [''],
      // province_id: [''],
      district_id: [''],
      wards_id: [''],
      // brand_id: ['',Validators.required],
      description: [''],
      // image: [null]
    });
    this.loadDistricts();

    this.get_all_news();

    this.subscription = this.admin.get_news(this.id).subscribe(
      (data: any) => {
        this.newsForm.patchValue(data.product); // đưa data vào form
        this.news = data.product;
        // this.images=data.images;
        console.log('data', data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get_all_news() {
    this.subscription = this.admin.get_all_news().subscribe(
      (data: any) => {
        this.category_product = data.category_product;
        this.brand = data.brand;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadDistricts() {
    // console.log('provinceId', provinceId)
    this.admin.getDistricts(33).subscribe((data: any) => {
      this.districts = data;
      console.log('districts', this.districts);
    });
  }

  loadWards(districtId: number) {
    this.admin.getWards(districtId).subscribe((data: any) => {
      this.wards = data;
    });
  }
  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (this.newsForm.invalid) {
      // alert('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc.');
      this.toastr.error('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc!');
      return;
    }
    this.selectedDistrict = this.newsForm.value.district_id;
    this.selectedWard = this.newsForm.value.wards_id;
    const formData = new FormData();
    formData.append('category_id', this.newsForm.value.category_id);
    // formData.append('brand_id', this.newsForm.value.brand_id);
    formData.append('name', this.newsForm.value.name);
    formData.append('default_price', this.newsForm.value.default_price);
    formData.append('room_area', this.newsForm.value.room_area);
    formData.append('at_maximum', this.newsForm.value.at_maximum);
    formData.append('total_room', this.newsForm.value.total_room);
    formData.append('preferred_gender', this.newsForm.value.preferred_gender);
    formData.append('self_governance', this.newsForm.value.self_governance);
    formData.append('host', this.newsForm.value.host);
    formData.append('phone', this.newsForm.value.phone);
    formData.append('address', this.newsForm.value.address);
    // formData.append('province_id', this.productForm.value.province_id);
    formData.append('district_id', this.newsForm.value.district_id);
    formData.append('wards_id', this.newsForm.value.wards_id);
    // formData.append('tech_specs', this.newsForm.value.tech_specs);
    formData.append('description', this.newsForm.value.description);
    // formData.append('_method', 'PUT');

    console.log('name', formData);
    if (this.imageFiles && this.imageFiles.length > 0) {
      for (let i = 0; i < this.imageFiles.length; i++) {
        if (this.imageFiles[i]) {
          // Thêm điều kiện kiểm tra tệp không phải null
          // formData.append(`existing_images[${i}]`, this.product.images[i].id);
          formData.append(`image[${i}]`, this.imageFiles[i]);
        }
      }
    }

    formData.forEach((value, key) => {
      console.log('?', key, value);
    });
    console.log(this.newsForm.value);
    this.admin.update_news(this.id, formData).subscribe(
      (res) => {
        // do something with the response
        this.toastr.success('Cập nhật thành công!', );
        // this.router.navigate(['/product']); // navigate to products page after successful update
      },
      (error) => {
        this.toastr.error('Cập nhật thất bại!', );
      }
    );
  }
  deleteImage(imageId: number) {
    const index = this.news.images.findIndex(
      (img: any) => img.id === imageId
    );
    if (index !== -1) {
      this.news.images.splice(index, 1);
    }
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader(); // tạo mới đối tượng FileReader
        const file = event.target.files[i]; // lấy file được chọn
        reader.readAsDataURL(file); // đọc file dưới dạng URL
        reader.onload = () => {
          // xử lý khi đã đọc xong file
          const result = reader.result as string; // chuyển đổi kết quả đọc file về dạng chuỗi
          // hiển thị ảnh trước khi tải lên
          const previewDiv = document.getElementById('preview')!;
          const image = document.createElement('img');
          image.src = result;
          image.width = 150; // đặt chiều rộng của ảnh
          previewDiv.appendChild(image); // thêm ảnh vào thẻ div có id là 'preview'

          // tạo nút X để xóa ảnh
          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = 'X';
          deleteButton.onclick = () => {
            previewDiv.removeChild(image); // xóa ảnh khỏi thẻ div
            previewDiv.removeChild(deleteButton); // xóa X
            this.imageFiles.splice(this.imageFiles.indexOf(file), 1); // xóa file khỏi mảng
          };
          previewDiv.appendChild(deleteButton); // thêm nút X vào thẻ div
        };
        this.imageFiles.push(file);
      }
    }
  }
}
