import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './containers/home/home.component'
import { FullLayoutComponent, SimpleLayoutComponent } from '@digital-first/df-layouts'
import { DfAuthGuardService } from 'libs/df-auth/src/lib/services/df-auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [DfAuthGuardService],
    children: [
      {
        path: '',
        component: HomeComponent,
      }
    ]
  },
  { path: '**', redirectTo: 'home' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
