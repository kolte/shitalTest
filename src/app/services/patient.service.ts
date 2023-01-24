import { Injectable } from '@angular/core';
import { patientModel } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  getAppdata() {
    return JSON.parse(localStorage.getItem('appData') || '{}');
  }

  getPatientData() {
    return (this.getAppdata().patient || []).filter((pat: any) => {
      return pat
    })
  }

  

}
