import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './containers/home/home.component'
import { SimpleLayoutComponent } from '@digital-first/df-layouts'

const routes: Routes = [
  { path: '', redirectTo: 'commitments', pathMatch: 'full' },
  {
    path: 'commitments',
    component: SimpleLayoutComponent,
    data: {
      title: 'Home'
    },
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
