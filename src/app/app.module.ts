import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GridComponent } from './grid/grid.component';
import { LocationService } from './location.service';
import { LoginService } from './login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LocationComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot ([
      {
        path : 'location',
        component : LocationComponent
      },
      {
        path : 'login',
        component : LoginComponent
      },
      {
        path : 'grid',
        component : GridComponent
      }
    ]),
    AppRoutingModule
  ],
  providers: [
    LocationService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
