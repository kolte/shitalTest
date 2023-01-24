import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { PatientDeleteData } from 'src/app/models/patient.model';

@Component({
  selector: 'app-patient-delete-modal',
  templateUrl: './patient-delete-modal.component.html',
  styleUrls: ['./patient-delete-modal.component.scss'],
})
export class PatientDeleteModalComponent {
  patientDeleteData: PatientDeleteData = {};
  showDeleteModal: boolean = false;

  constructor(public patientservice: PatientService) {}

  ngOnInit(): void {
    this.patientservice.showDeleteModal.subscribe((status) => {
      this.showDeleteModal = status;
    });
    this.patientservice.toBeDeleteData.subscribe((data) => {
      console.log('===333==',data)
      this.patientDeleteData = data;
    });
  }

  deleteData() {
    console.log('=====',this.patientDeleteData._id)
    if (!this.patientDeleteData._id) return;
    this.patientservice.deletePatient(this.patientDeleteData._id);
    this.patientservice.changeStatusOfDeleteModal(false, {});
  }
}
