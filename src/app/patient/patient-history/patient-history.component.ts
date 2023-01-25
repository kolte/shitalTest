import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent {
  validateForm!: UntypedFormGroup;
  smokerOptions = [
    { label: 'Heavy Smoker', value: 'heavy' },
    { label: 'Moderate Smoker', value: 'moderate' },
    { label: 'Light Smoker', value: 'light' },
    { label: 'Casual Smoker', value: 'casual' },
    { label: 'non-Smoker', value: 'non' }
  ];
  alcoholOptions = [
    { label: 'Heavy Smoker', value: 'heavy' },
    { label: 'Moderate Smoker', value: 'moderate' },
    { label: 'Light Smoker', value: 'light' },
    { label: 'Casual Smoker', value: 'casual' },
    { label: 'non-Smoker', value: 'non' }
  ];
  drugOptions = [
    { label: 'Amphetamines', value: 'Amphetamines', checked: false },
    { label: 'Heroine', value: 'Heroine', checked: false },
    { label: 'Barbiturates', value: 'Barbiturates', checked: false },
    { label: 'Mairjuana', value: 'Mairjuana', checked: false },
    { label: 'No Drugs', value: 'No Drugs', checked: false }
  ];
  surgeriesOptions = [
    { label: 'Heart Surgery', value: 'Heart', checked: false },
    { label: 'Brfeast Surgery', value: 'Brfeast', checked: false },
    { label: 'Leg Surgery', value: 'Leg', checked: false },
    { label: 'Arm Surgery', value: 'Arm', checked: false },
    { label: 'No Drugs', value: 'No Drugs', checked: false }
  ];
  constructor(private fb: UntypedFormBuilder, public patientservice: PatientService, public router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      height: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      smoking: [null, [Validators.required]],
      alcohol: [null, [Validators.required]],
      drug: [
        this.drugOptions,
        [
          (formInfo: any) => {
            return !formInfo.value.find((option: { checked: boolean }) => option.checked) ? 'error' : '';
          }
        ]
      ],
      drugOther: [null],
      surgeries: [
        this.surgeriesOptions,
        [
          (formInfo: any) => {
            return !formInfo.value.find((option: { checked: boolean }) => option.checked) ? 'error' : '';
          }
        ]
      ],
      surgeriesOther: [null]
    });
  }

  submitForm() {
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      const data = {
        height: this.validateForm.value.height,
        weight: this.validateForm.value.weight,
        smoking: this.validateForm.value.smoking,
        alcohol: this.validateForm.value.alcohol,
        drug: this.validateForm.value.drug.filter((_: any) => _.checked == true),
        drugOther: this.validateForm.value.drugOther,
        surgeries: this.validateForm.value.surgeries.filter((_: any) => _.checked == true),
        surgeriesOther: this.validateForm.value.surgeriesOther
      };
      console.log(data);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        console.log(control);
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  gotoDashboard() {
    this.router.navigate(['']);
  }
}
