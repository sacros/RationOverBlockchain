import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
{ path: '', redirectTo: 'dashboard',pathMatch: 'full'},
{ path: 'dashboard', component:LayoutComponent, 
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
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
