import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { v4 as uuidv4 } from 'uuid';
import { PatientModel } from 'src/app/models/patient.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent {
  ismodelShow: boolean = false;
  validateForm!: UntypedFormGroup;
  sexOption = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Undisclosed', value: 'Undisclosed' },
  ];
  loading = false;
  editId: string | undefined;

  constructor(
    private fb: UntypedFormBuilder,
    public patientservice: PatientService,

  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      checkIn: [null, [Validators.required]],
    });

    this.patientservice.showPatientFormModal.subscribe((status: boolean) => {
      this.ismodelShow = status;
      if (status === false) {
        this.resetData();
      }
    });
    this.patientservice.toBeEditData.subscribe((data: PatientModel | null) => {
      if (data) {
        console.log(data);
        this.validateForm.patchValue({
          name: data.name,
          age: data.age,
          sex: data.sex,
          checkIn: data.checkIn,
        });
        this.editId = data._id;
      }
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.editId) {
        this.patientservice.editPatient({
          ...this.validateForm.value,
          _id: this.editId,
        });
      } else {
        this.patientservice.addPatient({
          ...this.validateForm.value,
          _id: uuidv4(),
        });
      }
      this.patientservice.changeStatusOfPatientModal(false, null);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  resetData() {
    this.validateForm.reset();
  }

  handleCancel(): void {
    this.patientservice.changeStatusOfPatientModal(false, null);
  }
}
