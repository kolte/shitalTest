import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear', checked: false },
    { label: 'Orange', value: 'Orange', checked: false },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    public patientservice: PatientService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      height: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      smoking: [null, [Validators.required]],
      alcohol: [null, [Validators.required]],
      // drug: [null, [Validators.required]],
      // surgeries: [null, [Validators.required]],
    });
  }

  submitForm(){

  }
}
