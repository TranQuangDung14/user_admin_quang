import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://127.0.0.1:8000/api/';
  // public host = environment.BASE_API;

  public code_tokens = `Bearer ${localStorage.getItem('profanis_auth')}`;

  private _islog = new BehaviorSubject<boolean>(false);
  public readonly TOKEN_NAME = 'profanis_auth';
  islog = this._islog.asObservable();
  get token() {
    return localStorage.getItem(this.TOKEN_NAME)!;
  }
  constructor(private _http: HttpClient, public router: Router) {
    //
    this._islog.next(!!this.token);
  }
  // hàm kiểm tra người dùng có đăng nhập hay không!
  isLoggedIn() {
    const token = localStorage.getItem('profanis_auth');
    return token !== null;
  }
  // login(data: any): Observable<any> {
  //   return this._http.post<any>(this.API_URL + 'login', data);
  // }
  // getalluser(): Observable<any> {
  //   return this._http.get<any>(this.API_URL + 'user/', {
  //     headers: {
  //       Authorization: this.code_tokens
  //     }
  //   });
  // }
  logout(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'logout', {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  // .Tài khoản trang user
  login_user(data: any) {
    return this._http.post<any>(this.API_URL + 'customer-login', data).pipe(
      tap((respose: any) => {
        // console.log('vao');
        this._islog.next(true);
        localStorage.setItem(this.TOKEN_NAME, respose.access_token);
      })
    );
  }
  register_user(data: any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'register_customer', data);
  }

  getalldashboard(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_news');
  }


  get_index_news(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_news/', {
      // headers: {
      //   Authorization: this.code_tokens
      // },
    }
    )
  };
  get_index_posts(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_posts/', {
      // headers: {
      //   Authorization: this.code_tokens
      // },
    }
    )
  };
  //detail dữ liệu theo id
  get_detail(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_news/' + id

    );
  }

  get_post_detail(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_posts/' + id

    );
  }
  //them tin
  create_add_news(data: any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'add-news/', data, {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  // gọi toàn bộ tin đăng
  get_all_news(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'news/', {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  // hiển thị tin theo tài khoản
  get_all_news_list(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'news-list/', {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  get_news(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'news/' + id, {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  // 'Content-Type': 'application/json',
  // 'Content-Type': 'multipart/form-data'
  update_news(id: number, data: any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'news/' + id, data, {
      headers: {
        Authorization: this.code_tokens,
        // 'Content-Type': 'application/json'
        // 'Content-Type': 'multipart/form-data'
      },
    });
  }
  // xóa tin
  delete_news(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'news/' + id, {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  update_password(data: any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'change-password/', data, {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  // địa chỉ
  // tỉnh
  getProvinces(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'provinces/');
  }
  // Huyện
  getDistricts(provinceId: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'districts/' + provinceId);
  }
  // xã
  getWards(districtId: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'wards/' + districtId);
  }

  // lọc
  // filter
  getFilteredProducts(category_id?: number, min_price?: number, max_price?: number, min_area?: number, max_area?: number, preferred_gender?: string, self_governance?: boolean, wards_id?: number, district_id?: number): Observable<any> {
    let params = new HttpParams();

    if (category_id) {
      params = params.set('category_id', category_id.toString());
    }
    if (min_price) {
      params = params.set('min_price', min_price.toString());
    }
    if (max_price) {
      params = params.set('max_price', max_price.toString());
    }
    if (min_area) {
      params = params.set('min_area', min_area.toString());
    }
    if (max_area) {
      params = params.set('max_area', max_area.toString());
    }
    if (preferred_gender) {
      params = params.set('preferred_gender', preferred_gender);
    }
    if (self_governance != null) {
      params = params.set('self_governance', self_governance.toString());
    }
    if (wards_id) {
      params = params.set('wards_id', wards_id.toString());
    }
    if (district_id) {
      params = params.set('district_id', district_id.toString());
    }

    return this._http.get<any>(this.API_URL + 'filter_news/', { params });
  }
  //lưu tin
  save_news(data: any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'save_news/', data, {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
// Hủy lưu tin
cancel_save_news(news_id: any): Observable<any> {
  return this._http.delete<any>(this.API_URL + 'save_news', {
    params: new HttpParams().set('news_id', news_id),
    headers: {
      Authorization: this.code_tokens,
    },
  });
}
get_save_news(): Observable<any> {
  return this._http.get<any>(this.API_URL + 'save_news/', {
    headers: {
      Authorization: this.code_tokens
    }
  });
}
}
