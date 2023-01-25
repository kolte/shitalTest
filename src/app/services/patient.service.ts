import { Injectable } from '@angular/core';
import { PatientDeleteData, PatientModel } from '../models/patient.model';
import { BehaviorSubject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from './apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public showDeleteModal: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public toBeDeleteData: BehaviorSubject<PatientDeleteData> = new BehaviorSubject({});
  public patients: BehaviorSubject<PatientModel[]> = new BehaviorSubject<PatientModel[]>([]);
  public showPatientFormModal: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public toBeEditData: BehaviorSubject<PatientModel | null> = new BehaviorSubject<PatientModel | null>(null);

  constructor(private message: NzMessageService, private apiService: ApiService) {}

  changeStatusOfDeleteModal(status: boolean, data: PatientDeleteData) {
    this.showDeleteModal.next(status);
    this.toBeDeleteData.next(data);
  }

  changeStatusOfPatientModal(status: boolean, data: PatientModel | null) {
    this.showPatientFormModal.next(status);
    this.toBeEditData.next(data);
  }

  async getPatientData() {
    try {
      const { data: patients }: { data: PatientModel[] } = await this.apiService.get('/patient');
      this.patients.next(patients);
    } catch (error: any) {
      if (error?.message) this.message.error(error.message);
    }
  }
  async getPatientById(id: string) {
    try {
      const { data: patient }: { data: PatientModel } = await this.apiService.get(`/patient/${id}`);
      return patient;
    } catch (error: any) {
      if (error?.message) this.message.error(error.message);
      return false;
    }
  }

  async addPatient(patientData: PatientModel) {
    try {
      const res = await this.apiService.post('/patient', patientData);
      console.log(res);
      this.getPatientData();
      this.message.success(`New patient ${patientData.name} has been added successfully.`);
    } catch (error: any) {
      if (error?.message) this.message.error(error.message);
    }
  }

  async editPatient(patientData: PatientModel) {
    try {
      const res = await this.apiService.patch(`/patient/${patientData.id}`, patientData);
      console.log(res);
      this.getPatientData();
      this.message.success(`Patient ${patientData.name} has been updated successfully.`);
    } catch (error: any) {
      if (error?.message) this.message.error(error.message);
    }
  }

  async deletePatient(id: string) {
    try {
      const res = await this.apiService.delete(`/patient/${id}`);
      console.log(res);
      this.getPatientData();
      this.message.success(`Patient has been deleted successfully.`);
    } catch (error: any) {
      if (error?.message) this.message.error(error.message);
    }
  }

  async savePatientHistory(patientData: PatientModel, patientHistory: any) {
    try {
      const res = await this.apiService.patch(`/patient/${patientData.id}`, { patientHistory });
      this.message.success(`Patient history of ${patientData.name} has been updated successfully.`);
    } catch (error: any) {
      if (error?.message) this.message.error(error.message);
    }
  }
}
