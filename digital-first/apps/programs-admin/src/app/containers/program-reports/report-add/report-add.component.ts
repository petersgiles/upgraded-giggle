import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'digital-first-report-add',
  templateUrl: './report-add.component.html',
  styleUrls: ['./report-add.component.scss']
})
export class ReportAddComponent implements OnInit {

  addReportForm = this.formBuilder.group({
    programName: [null, Validators.required],
    notes: [''],
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private location: Location) {
  }

  onSubmit() {
    console.log('TODO:  save the report against the program');
  }

  cancel() {
    return this.location.back()
  }

  ngOnInit(): void {
  }
}
