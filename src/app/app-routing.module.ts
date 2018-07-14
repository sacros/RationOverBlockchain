import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CommodityRatesComponent } from './component/commodity-rates/commodity-rates.component';
import { StockallocationComponent } from './component/stockallocation/stockallocation.component';
import { RationallocationComponent } from './component/rationallocation/rationallocation.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'commodityRates', component: LayoutComponent,
    children: [
      {
        path: '',
        component: CommodityRatesComponent
      }
    ]
  },
  {
    path: 'stockAllocation', component: LayoutComponent,
    children: [
      {
        path: '',
        component: StockallocationComponent
      }
    ]
  },
  {
    path: 'rationAllocation', component: LayoutComponent,
    children: [
      {
        path: '',
        component: RationallocationComponent
      }
    ]
  },
  {
    path: 'dashboard', component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
