import { Injectable } from '@angular/core';
import { PatientDeleteData, PatientModel } from '../models/patient.model';
import { BehaviorSubject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  public showDeleteModal: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public toBeDeleteData: BehaviorSubject<PatientDeleteData> =
    new BehaviorSubject({});
  public patients: BehaviorSubject<PatientModel[]> = new BehaviorSubject<
    PatientModel[]
  >([]);
  public showPatientFormModal: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  public toBeEditData: BehaviorSubject<PatientModel | null> =
    new BehaviorSubject<PatientModel | null>(null);
  constructor(private message:NzMessageService) {}

  changeStatusOfDeleteModal(status: boolean, data: PatientDeleteData) {
    this.showDeleteModal.next(status);
    this.toBeDeleteData.next(data);
  }

  changeStatusOfPatientModal(status: boolean, data: PatientModel | null) {
    this.showPatientFormModal.next(status);
    this.toBeEditData.next(data);
  }

  getAppdata() {
    return JSON.parse(localStorage.getItem('appData') || '{}');
  }

  getPatientData() {
    const patients = (this.getAppdata().patient || []).filter((pat: any) => {
      return pat;
    });
    this.patients.next(patients);
  }

  addPatient(patientData: PatientModel) {
    try {
      const appData = this.getAppdata();
      localStorage.setItem(
        'appData',
        JSON.stringify({
          ...appData,
          patient: [...(appData.patient || []), patientData],
        })
      );
      this.message.success(`New patient ${patientData.name} has been added successfully.`)
    } catch (error) {}
    this.getPatientData();
  }

  editPatient(patientData: PatientModel) {
    let data = this.getAppdata().patient || [];
    const findData = data.findIndex((pat: any) => pat._id === patientData._id);
    data[findData] = patientData;
    const appData = this.getAppdata();
    localStorage.setItem(
      'appData',
      JSON.stringify({ ...appData, patient: data })
    );
    this.getPatientData();
    this.message.success(`Patient ${patientData.name} has been updated successfully.`)

  }

  deletePatient(id: string) {
    let data = this.getAppdata().patient || [];
    const deleteData = data.findIndex((emp: any) => emp._id === id);
    data.splice(deleteData, 1);
    const appData = this.getAppdata();
    localStorage.setItem(
      'appData',
      JSON.stringify({ ...appData, patient: data })
    );
    this.message.success(`Patient has been deleted successfully.`)
    this.getPatientData();
  }
}
