// src/app/app.routes.spec.ts

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { appRoutes } from './app.routes';

// -------------------- Home --------------------
import { HomePageComponent } from './pages/home-page/home-page.component';

// -------------------- Appointments --------------------
import { AppointmentListComponent } from './pages/appointments/appointments-page.component';
import { CreateAppointmentComponent } from './pages/appointments/create/create-appointment.component';
import { EditAppointmentComponent } from './pages/appointments/edit/edit-appointment.component';
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

describe('App Routes', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes)],
    });
    router = TestBed.inject(Router);
  });

  it('should contain a home route', () => {
    const route = appRoutes.find(r => r.path === '');
    expect(route).toBeDefined();
    expect(route!.component).toBe(HomePageComponent);
  });

  it('should contain appointments routes', () => {
    const listRoute = appRoutes.find(r => r.path === 'appointments');
    expect(listRoute).toBeDefined();
    expect(listRoute!.component).toBe(AppointmentListComponent);

    const createRoute = appRoutes.find(r => r.path === 'appointments/create');
    expect(createRoute).toBeDefined();
    expect(createRoute!.component).toBe(CreateAppointmentComponent);
    expect(createRoute!.data?.['mode']).toBe('create');

    const editRoute = appRoutes.find(r => r.path === 'appointments/edit/:id');
    expect(editRoute).toBeDefined();
    expect(editRoute!.component).toBe(EditAppointmentComponent);
    expect(editRoute!.data?.['mode']).toBe('edit');

    const deleteRoute = appRoutes.find(r => r.path === 'appointments/delete/:id');
    expect(deleteRoute).toBeDefined();
    expect(deleteRoute!.component).toBe(DeleteAppointmentComponent);

    const detailsRoute = appRoutes.find(r => r.path === 'appointments/details/:id');
    expect(detailsRoute).toBeDefined();
    expect(detailsRoute!.component).toBe(DetailsAppointmentComponent);
  });

  it('should contain doctors routes', () => {
    const listRoute = appRoutes.find(r => r.path === 'doctors');
    expect(listRoute).toBeDefined();
    expect(listRoute!.component).toBe(DoctorListComponent);

    const createRoute = appRoutes.find(r => r.path === 'doctors/create');
    expect(createRoute).toBeDefined();
    expect(createRoute!.component).toBe(CreateDoctorComponent);

    const editRoute = appRoutes.find(r => r.path === 'doctors/edit/:id');
    expect(editRoute).toBeDefined();
    expect(editRoute!.component).toBe(DoctorEditComponent);

    const detailsRoute = appRoutes.find(r => r.path === 'doctors/details/:id');
    expect(detailsRoute).toBeDefined();
    expect(detailsRoute!.component).toBe(DoctorDetailsComponent);

    const deleteRoute = appRoutes.find(r => r.path === 'doctors/delete/:id');
    expect(deleteRoute).toBeDefined();
    expect(deleteRoute!.component).toBe(DeleteDoctorComponent);
  });

  it('should contain patient routes', () => {
    const listRoute = appRoutes.find(r => r.path === 'patient');
    expect(listRoute).toBeDefined();
    expect(listRoute!.component).toBe(PatientIndexComponent);

    const createRoute = appRoutes.find(r => r.path === 'patient/create');
    expect(createRoute).toBeDefined();
    expect(createRoute!.component).toBe(CreatePatientComponent);

    const editRoute = appRoutes.find(r => r.path === 'patient/edit/:id');
    expect(editRoute).toBeDefined();
    expect(editRoute!.component).toBe(EditPatientComponent);

    const detailsRoute = appRoutes.find(r => r.path === 'patient/details/:id');
    expect(detailsRoute).toBeDefined();
    expect(detailsRoute!.component).toBe(DetailsPatientComponent);

    const deleteRoute = appRoutes.find(r => r.path === 'patient/delete/:id');
    expect(deleteRoute).toBeDefined();
    expect(deleteRoute!.component).toBe(DeletePatientComponent);
  });

  it('should contain specialty routes', () => {
    const listRoute = appRoutes.find(r => r.path === 'specialty');
    expect(listRoute).toBeDefined();
    expect(listRoute!.component).toBe(SpecialtyListComponent);

    const createRoute = appRoutes.find(r => r.path === 'specialty/create');
    expect(createRoute).toBeDefined();
    expect(createRoute!.component).toBe(CreateSpecialtyComponent);

    const editRoute = appRoutes.find(r => r.path === 'specialty/edit/:id');
    expect(editRoute).toBeDefined();
    expect(editRoute!.component).toBe(EditSpecialtyComponent);

    const detailsRoute = appRoutes.find(r => r.path === 'specialty/details/:id');
    expect(detailsRoute).toBeDefined();
    expect(detailsRoute!.component).toBe(DetailsSpecialtyComponent);

    const deleteRoute = appRoutes.find(r => r.path === 'specialty/delete/:id');
    expect(deleteRoute).toBeDefined();
    expect(deleteRoute!.component).toBe(DeleteSpecialtyComponent);
  });
});
