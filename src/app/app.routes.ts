// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

// -------------------- Appointments --------------------
import { AppointmentsPageComponent } from './pages/appointments/appointments-page.component';
import { AppointmentFormComponent } from './pages/appointments/appointment-form.component';
import { DeleteAppointmentComponent } from './pages/appointments/delete/delete-appointment.component';
import { DetailsAppointmentComponent } from './pages/appointments/details/details-appointment.component';

// -------------------- Doctors --------------------
import { DoctorListComponent } from './pages/doctors/doctor-list.component';
import { DeleteDoctorComponent } from './pages/doctors/delete/delete-doctor.component';
import { DoctorEditComponent } from './pages/doctors/edit/doctor-edit.component';
import { DoctorDetailsComponent } from './pages/doctors/details/doctor-details.component';
import { CreateDoctorComponent } from './pages/doctors/create/create-doctor.component';

// -------------------- Patients --------------------
import { PatientIndexComponent } from './pages/patient/patient-index.component';
import { DeletePatientComponent } from './pages/patient/delete/delete-patient.component';
import { CreatePatientComponent } from './pages/patient/create/create-patient.component';
import { EditPatientComponent } from './pages/patient/edit/edit-patient.component';
import { DetailsPatientComponent } from './pages/patient/details/details-patient.component';

// -------------------- Specialties --------------------
import { SpecialtyListComponent } from './pages/specialty/specialty-list.component';
import { DeleteSpecialtyComponent } from './pages/specialty/delete/delete-specialty.component';
import { CreateSpecialtyComponent } from './pages/specialty/create/create-specialty.component';
import { EditSpecialtyComponent } from './pages/specialty/edit/edit-specialty.component';
import { DetailsSpecialtyComponent } from './pages/specialty/details/details-specialty.component';

export const appRoutes: Routes = [
  { path: '', component: HomePageComponent },

  // -------------------- Appointments --------------------
  { path: 'appointments', component: AppointmentsPageComponent },
  { path: 'appointments/create', component: AppointmentFormComponent, data: { mode: 'create' } },
  { path: 'appointments/edit/:id', component: AppointmentFormComponent, data: { mode: 'edit' } },
  { path: 'appointments/delete/:id', component: DeleteAppointmentComponent },
  { path: 'appointments/details/:id', component: DetailsAppointmentComponent },

  // -------------------- Doctors --------------------
  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/create', component: CreateDoctorComponent },
  { path: 'doctors/edit/:id', component: DoctorEditComponent },
  { path: 'doctors/details/:id', component: DoctorDetailsComponent },
  { path: 'doctors/delete/:id', component: DeleteDoctorComponent },

  // -------------------- Patients --------------------
  { path: 'patient', component: PatientIndexComponent },
  { path: 'patient/create', component: CreatePatientComponent },
  { path: 'patient/edit/:id', component: EditPatientComponent },
  { path: 'patient/details/:id', component: DetailsPatientComponent },
  { path: 'patient/delete/:id', component: DeletePatientComponent },

  // -------------------- Specialties --------------------
  { path: 'specialty', component: SpecialtyListComponent },
  { path: 'specialty/create', component: CreateSpecialtyComponent },
  { path: 'specialty/edit/:id', component: EditSpecialtyComponent },
  { path: 'specialty/details/:id', component: DetailsSpecialtyComponent },
  { path: 'specialty/delete/:id', component: DeleteSpecialtyComponent },
];
