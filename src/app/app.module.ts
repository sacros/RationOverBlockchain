import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MetaModule} from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';

import { IpfsService } from './service/ipfs.service';
import { Web3Service } from './util/web3.service';
// ../../../util/web3.service
import { ConversionService } from './service/conversion.service';
import { LayoutComponent } from './component/layout/layout.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CommodityRatesComponent } from './component/commodity-rates/commodity-rates.component';
import { StockallocationComponent } from './component/stockallocation/stockallocation.component';
import { RationallocationComponent } from './component/rationallocation/rationallocation.component';
import { LoginComponent } from './component/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    CommodityRatesComponent,
    StockallocationComponent,
    RationallocationComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MetaModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
