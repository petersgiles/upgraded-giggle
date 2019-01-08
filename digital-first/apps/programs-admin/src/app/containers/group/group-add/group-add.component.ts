import {Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {CreateGroupGQL} from '../../../generated/graphql'
import {Router} from '@angular/router'

@Component({
  selector: 'digital-first-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {

  addGroupForm = this.formBuilder.group({
    groupName: [null, Validators.required]
  })

  constructor(private formBuilder: FormBuilder,
              private createGroupGQL: CreateGroupGQL,
              private router: Router) {
  }

  onSubmit() {

    this.createGroupGQL.mutate({
      data: {
        title: this.addGroupForm.value['groupName']
      }
    }, {}).subscribe(({data}) =>
      this.router.navigate(['groups', data.createGroup.id]), (error) => {
      console.log('there was an error sending the query', error)
    })
  }

  ngOnInit(): void {
  }

  cancel() {
    return this.router.navigate(['groups'])
  }
}
