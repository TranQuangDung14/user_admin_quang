import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { HomeComponent } from './home/home.component';

import { LoginComponent } from './home/account/login/login.component';
import { RegisterComponent } from './home/account/register/register.component';

import { IndexComponent } from './home/component/index/index.component';

import { InstructComponent } from './home/component/instruct/instruct.component';

import { PostComponent } from './home/component/post/post.component';

import { News_listComponent } from './home/component/news/news_list/news_list.component';
import { News_detailComponent } from './home/component/news/news_detail/news_detail.component';


// import { SlickCarouselModule } from 'ngx-slick-carousel';

import { NewComponent } from './home/component/new/new.component';
import { NewAddComponent } from './home/component/new/new-add/new-add.component';
import { NewEditComponent } from './home/component/new/new-edit/new-edit.component';
import { NewHistoryComponent } from './home/component/new/new-history/new-history.component';
import { NewListComponent } from './home/component/new/new-list/new-list.component';
import { NewSaveComponent } from './home/component/new/new-save/new-save.component';
import { NewUpgradeComponent } from './home/component/new/new-upgrade/new-upgrade.component';
import { HomeIndexComponent } from './home/component/new/home-index/home-index.component';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';

const router_home:Routes=[
  {
  path:"",
  component: HomeComponent,
  children:[
    {
      path:"",
      component:IndexComponent,
    },

    {
      path:"instruct",
      component:InstructComponent,
    },

    {
      path:"post",
      component:PostComponent,
    },

    {
      path:"list",
      component:News_listComponent,
    },
    {
      path:"detail-news/:id",
      component:News_detailComponent,
    },

    {
      path:"new",
      component:NewComponent,
      canActivate: [AuthGuardGuard],
      children:[
        {
          path:"index",
          component:HomeIndexComponent,
        },
        {
          path:"new-add",
          component:NewAddComponent,
        },
        {
          path:"new-edit/:id",
          component:NewEditComponent,
        },
        {
          path:"new-history",
          component:NewHistoryComponent,
        },
        {
          path:"new-list",
          component:NewListComponent,
        },
        {
          path:"new-save",
          component:NewSaveComponent,
        },
        {
          path:"new-upgrade",
          component:NewUpgradeComponent,
        },
      ]
    },


  ],

},
{
  path:"login",
  component:LoginComponent,
},
{
  path:"register",
  component:RegisterComponent,
},

]
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    // SlickCarouselModule,
    RouterModule.forChild(router_home),
  ],
  declarations: [
    HomeComponent,

    IndexComponent,

    InstructComponent,

    PostComponent,

    News_listComponent,
    News_detailComponent,


    NewComponent,
    NewAddComponent,
    NewEditComponent,
    NewHistoryComponent,
    NewSaveComponent,
    NewListComponent,
    NewUpgradeComponent,
    HomeIndexComponent,

    LoginComponent,
    RegisterComponent,

  ]
})
export class HomeModule { }
