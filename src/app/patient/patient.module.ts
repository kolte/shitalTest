import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientDeleteModalComponent } from './patient-delete-modal/patient-delete-modal.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [
    PatientComponent,
    PatientFormComponent,
    PatientDeleteModalComponent,
    PatientHistoryComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzRadioModule,
    NzDatePickerModule,
    NzIconModule,
    NzToolTipModule,
    NzCheckboxModule,
    NzGridModule
  ]
})
export class PatientModule { }
