export interface PatientModel {
  id?: string;
  name: string;
  age: number;
  sex: string;
  checkIn: string;
  patientHistory?: any;
}

export interface PatientDeleteData {
  id?: string;
  name?: string;
}
