import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RoomComponent } from './room/room.component';
import { LightComponent } from './light/light.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { CookieService } from 'ngx-cookie-service';
import { ColorPickerModule } from 'ngx-color-picker';
import { LightDetailComponent } from './light-detail/light-detail.component';
import { LightSearchComponent } from './light-search/light-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    LightComponent,
    CreateuserComponent,
    LightDetailComponent,
    LightSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ColorPickerModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
