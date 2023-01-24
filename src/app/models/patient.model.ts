export interface PatientModel {
    _id?:string,
    name:string,
    age:number,
    sex:string,
    checkIn:string
}

export interface PatientDeleteData { _id?: string, name?: string }
