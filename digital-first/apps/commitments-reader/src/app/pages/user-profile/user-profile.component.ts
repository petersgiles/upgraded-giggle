import { Component, OnInit } from '@angular/core'
import { AppDataService } from '../../services/app-data/app-data.service'
import { Observable } from 'rxjs'
import { AppUserProfile } from '@digital-first/df-layouts'

@Component({
  selector: 'digital-first-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profile$: Observable<AppUserProfile>

  constructor(private service: AppDataService) {}

  ngOnInit() {
    this.profile$ = this.service.getCurrentUser()
  }
}
