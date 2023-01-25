export interface PatientModel {
    id?:string,
    name:string,
    age:number,
    sex:string,
    checkIn:string
}

export interface PatientDeleteData { id?: string, name?: string }
