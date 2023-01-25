import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PatientModel } from '../models/patient.model';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  listOfPatient: readonly PatientModel[] = [];
  loading = false;
  constructor(public patientservice: PatientService, public router: Router) {}

  ngOnInit(): void {
    this.patientservice.patients.subscribe(patient => {
      this.listOfPatient = patient;
    });
    this.patientservice.getPatientData();
  }

  editPatient(patientData: PatientModel) {
    this.patientservice.changeStatusOfPatientModal(true, patientData);
  }

  deletePatient(patientData: PatientModel) {
    console.log(patientData);
    this.patientservice.changeStatusOfDeleteModal(true, {
      name: patientData.name,
      id: patientData.id
    });
  }

  patientHistory(id: string | undefined) {
    if (id) this.router.navigate(['/patient-history', id]);
  }

  showModal() {
    this.patientservice.changeStatusOfPatientModal(true, null);
  }
}
