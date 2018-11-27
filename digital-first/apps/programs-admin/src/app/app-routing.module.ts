import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {HomeComponent} from './containers/home/home.component'
import {FullLayoutComponent} from '@digital-first/df-layouts'
import {AuthGuard} from '@digital-first/df-auth'
import {HomeaffairsComponent} from "./containers/homeaffairs/homeaffairs.component";
import {StatisticuploadComponent} from "./containers/statisticupload/statisticupload.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home',
      icon: 'home'
    },
    children: [
      {
        path: '',
        component: HomeComponent,
      }
    ]
  },
  {
    path: 'homeaffairs',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home Affairs Report',
      icon: 'security'
    },
    children: [
      {
        path: '',
        component: HomeaffairsComponent,
      }
    ]
  },
  {
    path: 'uploadstatistic',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Upload statistic',
      icon: 'file_copy'
    },
    children: [
      {
        path: '',
        component: StatisticuploadComponent,
      }
    ]
  },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
