export interface PatientHistory {
  height: string;
  weight: string;
  smoking: string;
  alcohol: string;
  drug: string[];
  drugOther: string;
  surgeries: string[];
  surgeriesOther: string;
}

export interface PatientModel {
  id?: string;
  name: string;
  age: number;
  sex: string;
  checkIn: string;
  patientHistory?: PatientHistory;
}

export interface PatientDeleteData {
  id?: string;
  name?: string;
}
