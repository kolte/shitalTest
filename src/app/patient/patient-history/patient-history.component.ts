import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent {
  validateForm!: UntypedFormGroup;
  smokerOption = [
    { label: 'Heavy Smoker', value: 'heavy' },
    { label: 'Moderate Smoker', value: 'moderate' },
    { label: 'Light Smoker', value: 'light' },
    { label: 'Casual Smoker', value: 'casual' },
    { label: 'non-Smoker', value: 'non' },
  ];
  alcoholOption = [
    { label: 'Heavy Smoker', value: 'heavy' },
    { label: 'Moderate Smoker', value: 'moderate' },
    { label: 'Light Smoker', value: 'light' },
    { label: 'Casual Smoker', value: 'casual' },
    { label: 'non-Smoker', value: 'non' },
  ];
  drug = [
    { label: 'Amphetamines', value: 'Amphetamines', checked: false },
    { label: 'Heroine', value: 'Heroine', checked: false },
    { label: 'Barbiturates', value: 'Barbiturates', checked: false },
    { label: 'Mairjuana', value: 'Mairjuana', checked: false },
    { label: 'No Drugs', value: 'No Drugs', checked: false },
  ];
  surgeries = [
    { label: 'Heart Surgery', value: 'Heart', checked: false },
    { label: 'Brfeast Surgery', value: 'Brfeast', checked: false },
    { label: 'Leg Surgery', value: 'Leg', checked: false },
    { label: 'Arm Surgery', value: 'Arm', checked: false },
    { label: 'No Drugs', value: 'No Drugs', checked: false },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public patientservice: PatientService,
    public router:Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      height: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      smoking: [null, [Validators.required]],
      alcohol: [null, [Validators.required]],
      drug:[this.drug,[Validators.required]],
      surgeries: [this.surgeries,[Validators.required]],
    });
  }

  submitForm(){
    if (this.validateForm.valid) {
      console.log(this.validateForm.value)
      return
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  gotoDashboard(){
    this.router.navigate([''])
  }
  checkData(event:any){

  }
}
