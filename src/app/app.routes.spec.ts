// src/app/app.routes.spec.ts

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { appRoutes } from './app.routes';

import { HomePageComponent } from './pages/home-page/home-page.component';

// Appointments
import { AppointmentsPageComponent } from './pages/appointments/appointments-page.component';
import { AppointmentFormComponent } from './pages/appointments/appointment-form.component';
import { DeleteAppointmentComponent } from './pages/appointments/delete/delete-appointment.component';

// Doctors
import { DoctorListComponent } from './pages/doctors/doctor-list.component';
import { DeleteDoctorComponent } from './pages/doctors/delete/delete-doctor.component';

// Patients
import { PatientIndexComponent } from './pages/patient/patient-index.component';
import { DeletePatientComponent } from './pages/patient/delete/delete-patient.component';

// Specialties
import { SpecialtyListComponent } from './pages/specialty/specialty-list.component';
import { DeleteSpecialtyComponent } from './pages/specialty/delete/delete-specialty.component';
import { CreateSpecialtyComponent } from './pages/specialty/create/create-specialty.component';

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
    const createRoute = appRoutes.find(r => r.path === 'appointments/create');
    expect(createRoute).toBeDefined();
    expect(createRoute!.component).toBe(AppointmentFormComponent);
    expect(createRoute!.data?.['mode']).toBe('create');

    const editRoute = appRoutes.find(r => r.path === 'appointments/edit/:id');
    expect(editRoute).toBeDefined();
    expect(editRoute!.component).toBe(AppointmentFormComponent);
    expect(editRoute!.data?.['mode']).toBe('edit');

    const deleteRoute = appRoutes.find(r => r.path === 'appointments/delete/:id');
    expect(deleteRoute).toBeDefined();
    expect(deleteRoute!.component).toBe(DeleteAppointmentComponent);
  });

  it('should contain doctors routes', () => {
    const listRoute = appRoutes.find(r => r.path === 'doctors');
    expect(listRoute).toBeDefined();
    expect(listRoute!.component).toBe(DoctorListComponent);

    const deleteRoute = appRoutes.find(r => r.path === 'doctors/delete/:id');
    expect(deleteRoute).toBeDefined();
    expect(deleteRoute!.component).toBe(DeleteDoctorComponent);
  });

  it('should contain patient routes', () => {
    const listRoute = appRoutes.find(r => r.path === 'patient');
    expect(listRoute).toBeDefined();
    expect(listRoute!.component).toBe(PatientIndexComponent);

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

    const deleteRoute = appRoutes.find(r => r.path === 'specialty/delete/:id');
    expect(deleteRoute).toBeDefined();
    expect(deleteRoute!.component).toBe(DeleteSpecialtyComponent);
  });
});
