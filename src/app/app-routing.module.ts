import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {  
    path:'', 
    component: HomeComponent,
    pathMatch: 'full'
 },
 {
    path:'user',
    component:DetailsComponent
 },
 {
    path:'user/:userName', 
    component:DetailsComponent
 },
 {
  path: '**',
  redirectTo: ''
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
