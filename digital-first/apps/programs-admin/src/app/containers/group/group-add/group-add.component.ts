import {Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {CreateAccessControlGroupGQL} from '../../../generated/graphql'
import {Router} from '@angular/router'

@Component({
  selector: 'digital-first-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {

  addGroupForm = this.formBuilder.group({
    groupName: [null, [Validators.required, Validators.maxLength(450)]
               ]
  })


 constructor(private formBuilder: FormBuilder,
              private createAccessControlGroupGql: CreateAccessControlGroupGQL,
              private router: Router) {
  }

  onSubmit() {

    this.createAccessControlGroupGql.mutate({
      data: {title: this.addGroupForm.value['groupName']}
    }, {}).subscribe(({data}) =>
      this.router.navigate(['groups', data.createAccessControlGroup.id]))
  }

  ngOnInit(): void {
  }

  cancel() {
    return this.router.navigate(['groups'])
  }
}
