import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-new-add',
  templateUrl: './new-add.component.html',
  styleUrls: ['./new-add.component.css']
})
export class NewAddComponent implements OnInit {
  imageFiles: File[] = [];
  productForm: FormGroup;
  category_product: any;
  brand: any;
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  selectedProvince: any;
  selectedDistrict: any;
  selectedWard: any;
  private subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private admin: ApiService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      default_price: ['', Validators.required],
      room_area: ['', Validators.required],
      at_maximum: ['', Validators.required],
      total_room: ['', Validators.required],
      preferred_gender: ['', Validators.required],
      self_governance: ['', Validators.required],
      host: ['', Validators.required],
      phone: ['', Validators.required],
      // price: ['', Validators.required],
      // tech_specs: ['',Validators.required],
      category_id: ['', Validators.required],
      // brand_id: ['',Validators.required],
      address: [''],
      // province_id: [''],
      district_id: [''],
      wards_id: [''],
      description: [''],

      // image: [null]
    });
    this.get_all_product();
    // this.loadProvinces();
    this.loadDistricts();
  }
  // loadProvinces() {
  //   this.admin.getProvinces().subscribe((data: any) => {
  //     this.provinces = data;
  //     console.log('tỉnh', this.provinces)
  //   });
  // }

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
  get_all_product() {
    this.subscription = this.admin.get_all_news()
      .subscribe((data: any) => {
        this.category_product = data.category_product;
        this.brand = data.brand;
      }, error => {
        console.log(error);

      }
      )
  }
  submitted = false;
  onSubmit() {
    this.submitted = true;
    // this.selectedProvince = this.productForm.value.province_id;
    this.selectedDistrict = this.productForm.value.district_id;
    this.selectedWard = this.productForm.value.wards_id;
    if (this.productForm.invalid) {

      this.toastr.error('Vui lòng điền đầy đủ thông tin và kiểm tra lại các trường bắt buộc!');
      return;
    }
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('default_price', this.productForm.value.default_price);
    formData.append('room_area', this.productForm.value.room_area);
    formData.append('at_maximum', this.productForm.value.at_maximum);
    formData.append('total_room', this.productForm.value.total_room);
    formData.append('preferred_gender', this.productForm.value.preferred_gender);
    formData.append('self_governance', this.productForm.value.self_governance);
    formData.append('host', this.productForm.value.host);
    formData.append('phone', this.productForm.value.phone);
    // formData.append('tech_specs', this.productForm.value.tech_specs);
    formData.append('category_id', this.productForm.value.category_id);
    formData.append('address', this.productForm.value.address);
    // formData.append('province_id', this.productForm.value.province_id);
    formData.append('district_id', this.productForm.value.district_id);
    formData.append('wards_id', this.productForm.value.wards_id);
    // formData.append('brand_id', this.productForm.value.brand_id);
    formData.append('description', this.productForm.value.description);

    if (this.imageFiles && this.imageFiles.length > 0) {
      for (let i = 0; i < this.imageFiles.length; i++) {
        formData.append(`image[${i}]`, this.imageFiles[i]);
      }
    }
    // formData.forEach((value, key) => {
    //   console.log(key, value)
    // }),
    console.log('this',this.productForm.value)
    this.admin.create_add_news(formData).subscribe(
      res => {
        // this.router.navigate(['/product']);
        this.toastr.success('Thêm mới thành công!',);
        // console.log(res);
        // do something with the response
      },
      error => {
        console.log('loi', error);
        this.toastr.error('Thêm mới thất bại kiểm tra lại!',);
        // do something with the error
      }
    );
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader(); // tạo mới đối tượng FileReader
        const file = event.target.files[i]; // lấy file được chọn
        reader.readAsDataURL(file); // đọc file dưới dạng URL
        reader.onload = () => { // xử lý khi đã đọc xong file
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
            previewDiv.removeChild(deleteButton); // xóa nút x
            this.imageFiles.splice(this.imageFiles.indexOf(file), 1); // xóa file khỏi mảng
          };
          previewDiv.appendChild(deleteButton); // thêm nút X vào thẻ div
        };
        this.imageFiles.push(file);
      }
    }
  }



}
