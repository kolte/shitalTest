import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { PatientComponent } from './patient.component';

const routes: Routes = [
  {
    path:'',
    component:PatientComponent
  },
  {
    path:'patient-history/:id',
    component:PatientHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
