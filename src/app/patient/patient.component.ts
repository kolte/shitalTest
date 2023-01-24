import { Component } from '@angular/core';
import { patientModel } from '../models/patient.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  listOfPatientData: readonly patientModel[] = [];
  ismodelShow = false;
  isDeleteModelShow = false;
  loading = false;
  validateForm!: UntypedFormGroup;
  sexOption = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Undisclosed', value: 'Undisclosed' }
  ];

  constructor(private fb: UntypedFormBuilder,public patientservice:PatientService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      check_in: [null, [Validators.required]]
    });
    this.getPatientData();
  }

  getPatientData(){
    this.listOfPatientData = this.patientservice.getPatientData();
  }

 
  

}
