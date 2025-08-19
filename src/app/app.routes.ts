// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

// Appointments
import { AppointmentsPageComponent } from './pages/appointments/appointments-page.component';
import { AppointmentFormComponent } from './pages/appointments/appointment-form.component';
import { DeleteAppointmentComponent } from './pages/appointments/delete/delete-appointment.component';
// (Adicionar outros componentes de appointments se necessário)

// Doctors
import { DoctorListComponent } from './pages/doctors/doctor-list.component';
import { DeleteDoctorComponent } from './pages/doctors/delete/delete-doctor.component';
// (Adicionar outros componentes de doctors se necessário)

// Patients
import { PatientIndexComponent } from './pages/patient/patient-index.component';
import { DeletePatientComponent } from './pages/patient/delete/delete-patient.component';
// (Adicionar outros componentes de patients se necessário)

// Specialties
import { SpecialtyListComponent } from './pages/specialty/specialty-list.component';
import { DeleteSpecialtyComponent } from './pages/specialty/delete/delete-specialty.component';
// (Adicionar outros componentes de specialties se necessário)

export const appRoutes: Routes = [
  { path: '', component: HomePageComponent },

  // Appointments
  { path: 'appointments', component: AppointmentsPageComponent },
  { path: 'appointments/create', component: AppointmentFormComponent, data: { mode: 'create' } },
  { path: 'appointments/edit/:id', component: AppointmentFormComponent, data: { mode: 'edit' } },
  { path: 'appointments/delete/:id', component: DeleteAppointmentComponent },
  // adicionar detalhes, confirm, cancel, calendar se necessário

  // Doctors
  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/delete/:id', component: DeleteDoctorComponent },
  // adicionar create, edit, details se necessário

  // Patients
  { path: 'patient', component: PatientIndexComponent },
  { path: 'patient/delete/:id', component: DeletePatientComponent },
  // adicionar create, edit, details, history, upload-profile-picture se necessário

  // Specialties
  { path: 'specialty', component: SpecialtyListComponent },
  { path: 'specialty/create', component: DeleteSpecialtyComponent }, // substituir pelo CreateSpecialtyComponent se existir
  { path: 'specialty/delete/:id', component: DeleteSpecialtyComponent },
  // adicionar details, edit se necessário
];
