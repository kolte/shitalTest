import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PatientModel } from 'src/app/models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent {
  validateForm!: UntypedFormGroup;
  smokerOptions = [
    { label: 'Heavy Smoker', value: 'heavy' },
    { label: 'Moderate Smoker', value: 'moderate' },
    { label: 'Light Smoker', value: 'light' },
    { label: 'Casual Smoker', value: 'casual' },
    { label: 'non-Smoker', value: 'non' }
  ];
  alcoholOptions = [
    { label: 'Heavy Smoker', value: 'heavy' },
    { label: 'Moderate Smoker', value: 'moderate' },
    { label: 'Light Smoker', value: 'light' },
    { label: 'Casual Smoker', value: 'casual' },
    { label: 'non-Smoker', value: 'non' }
  ];
  drugOptions = [
    { label: 'Amphetamines', value: 'Amphetamines', checked: false },
    { label: 'Heroine', value: 'Heroine', checked: false },
    { label: 'Barbiturates', value: 'Barbiturates', checked: false },
    { label: 'Mairjuana', value: 'Mairjuana', checked: false },
    { label: 'No Drugs', value: 'No Drugs', checked: false }
  ];
  surgeriesOptions = [
    { label: 'Heart Surgery', value: 'Heart', checked: false },
    { label: 'Breast Surgery', value: 'Breast', checked: false },
    { label: 'Leg Surgery', value: 'Leg', checked: false },
    { label: 'Arm Surgery', value: 'Arm', checked: false },
    { label: 'No Drugs', value: 'No Drugs', checked: false }
  ];
  activePatientId?: string;
  patientData?: PatientModel;
  BMI=0;
  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    public patientservice: PatientService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      height: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      smoking: [null, [Validators.required]],
      alcohol: [null, [Validators.required]],
      drug: [
        this.drugOptions,
        [
          (formInfo: any) => {
            return !formInfo.value.find((option: { checked: boolean }) => option.checked) ? 'error' : '';
          }
        ]
      ],
      drugOther: [null],
      surgeries: [
        this.surgeriesOptions,
        [
          (formInfo: any) => {
            return !formInfo.value.find((option: { checked: boolean }) => option.checked) ? 'error' : '';
          }
        ]
      ],
      surgeriesOther: [null]
    });
    this.route.params.subscribe((para: any) => {
      this.activePatientId = para.id;
      this.getPatientData();
    });
  }

  async getPatientData() {
    if (this.activePatientId) {
      const patientData = await this.patientservice.getPatientById(this.activePatientId);
      if (!patientData) return;
      this.patientData = patientData;
      const { patientHistory } = patientData;
      if (!patientHistory) return;
      console.log(patientHistory.drug)
      this.validateForm.patchValue({
        height: patientHistory.height || null,
        weight: patientHistory.weight || null,
        smoking: patientHistory.smoking || null,
        alcohol: patientHistory.alcohol || null,
        drug: patientHistory.drug
          ? this.drugOptions.map(drug => {
              drug.checked = patientHistory.drug.includes(drug.value);
              return drug;
            })
          : null,
        drugOther: patientHistory.drugOther || null,
        surgeries: patientHistory.surgeries
          ? this.surgeriesOptions.map(drug => {
              drug.checked = patientHistory.surgeries.includes(drug.value);
              return drug;
            })
          : null,
        surgeriesOther: patientHistory.surgeriesOther || null
      });
    }
  }

  async submitForm() {
    if (this.validateForm.valid && this.patientData) {
      const data = {
        height: this.validateForm.value.height,
        weight: this.validateForm.value.weight,
        smoking: this.validateForm.value.smoking,
        alcohol: this.validateForm.value.alcohol,
        drug: this.validateForm.value.drug
          .filter((_: any) => _.checked == true)
          .map((_: { value: string }) => _.value),
        drugOther: this.validateForm.value.drugOther,
        surgeries: this.validateForm.value.surgeries
          .filter((_: any) => _.checked == true)
          .map((_: { value: string }) => _.value),
        surgeriesOther: this.validateForm.value.surgeriesOther
      };
      await this.patientservice.savePatientHistory(this.patientData, data);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  calculateBMI(){
    if(this.validateForm.value.height>0 && this.validateForm.value.weight>0){
    let height = this.validateForm.value.height;
    let weight = this.validateForm.value.weight;
    let BMI = (weight/height/height)*10000; 
    this.BMI = BMI;
    }
    else{
      this.BMI=0;
    }
  }

  gotoDashboard() {
    this.router.navigate(['']);
  }
}
