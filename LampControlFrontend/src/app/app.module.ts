import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GroupComponent } from './group/group.component';
import { LightComponent } from './light/light.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { CookieService } from 'ngx-cookie-service';
import { ColorPickerModule } from 'ngx-color-picker';
import { DetailComponent } from './detail/detail.component';
import { LightSearchComponent } from './light-search/light-search.component';
import { LightChangeComponent } from './light-change/light-change.component';
import { SceneComponent } from './scene/scene.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      GroupComponent,
      LightComponent,
      CreateuserComponent,
      DetailComponent,
      LightSearchComponent,
      LightChangeComponent,
      SceneComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ColorPickerModule
   ],
   providers: [
      CookieService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
