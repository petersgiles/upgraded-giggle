import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {HomeComponent} from './containers/home/home.component'
import {FullLayoutComponent} from '@digital-first/df-layouts'
import {AuthGuard} from '@digital-first/df-auth'
import {StatisticuploadComponent} from "./containers/statisticupload/statisticupload.component";
import {ProjectuploadComponent} from "./containers/projectupload/projectupload.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home',
          icon: 'home'
        }
      },
      {
        path: 'statistics/upload',
        component: StatisticuploadComponent,
        data: {
          title: 'Upload statistic',
          icon: 'file_copy'
        }
      },
      {
        path: 'project/upload',
        component: ProjectuploadComponent,
        data: {
          title: 'Upload project',
          icon: 'file_copy'
        }
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
