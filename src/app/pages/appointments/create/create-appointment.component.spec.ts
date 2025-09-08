// src/app/pages/appointments/create/create-appointment.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAppointmentComponent } from './create-appointment.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService, AppointmentStatus } from '../../../services/appointment.service';
import { PatientService, Patient } from '../../../services/patient.service';
import { DoctorService, Doctor } from '../../../services/doctor.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('CreateAppointmentComponent', () => {
  let component: CreateAppointmentComponent;
  let fixture: ComponentFixture<CreateAppointmentComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;

  const mockPatients: Patient[] = [
    { id: 1, name: 'Alice', cpf: '000.000.000-00', dateOfBirth: '1990-01-01', email: 'alice@email.com', phone: '1111-1111', address: 'Rua A' },
    { id: 2, name: 'Bob', cpf: '111.111.111-11', dateOfBirth: '1992-02-02', email: 'bob@email.com', phone: '2222-2222', address: 'Rua B' },
  ];

  const mockDoctors: Doctor[] = [
    { id: 10, name: 'Dr. John', crm: '12345', specialty: 'Cardiology', email: 'john@hospital.com', phone: '1111-1111', isActive: true },
    { id: 11, name: 'Dr. Jane', crm: '54321', specialty: 'Dermatology', email: 'jane@hospital.com', phone: '2222-2222', isActive: true },
  ];

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', ['add']);

    const patientServiceSpy = jasmine.createSpyObj('PatientService', ['getPatients']);
    const doctorServiceSpy = jasmine.createSpyObj('DoctorService', ['getDoctors']);
    patientServiceSpy.getPatients.and.returnValue(of(mockPatients));
    doctorServiceSpy.getDoctors.and.returnValue(of(mockDoctors));

    await TestBed.configureTestingModule({
      imports: [CreateAppointmentComponent, FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: DoctorService, useValue: doctorServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load patients and doctors on ngOnInit', () => {
    expect(component.patients).toEqual(jasmine.arrayContaining([
      jasmine.objectContaining({ id: 1, name: 'Alice' }),
      jasmine.objectContaining({ id: 2, name: 'Bob' }),
    ]));

    expect(component.doctors).toEqual(jasmine.arrayContaining([
      jasmine.objectContaining({ id: 10, name: 'Dr. John' }),
      jasmine.objectContaining({ id: 11, name: 'Dr. Jane' }),
    ]));
  });

  it('should call appointmentService.add and navigate on valid handleSubmit', () => {
    component.formData = {
      patientId: '1',
      doctorId: '10',
      appointmentDate: '2025-08-21T10:30',
      status: AppointmentStatus.Scheduled,
      notes: 'Observação teste'
    };

    const mockForm = { invalid: false } as NgForm;

    component.handleSubmit(mockForm);

    expect(appointmentServiceSpy.add).toHaveBeenCalledWith(jasmine.objectContaining({
      patientId: 1,
      doctorId: 10,
      appointmentDate: '2025-08-21T10:30',
      notes: 'Observação teste'
    }));

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
  });

  it('should not call add if form is invalid', () => {
    const mockForm = { invalid: true } as NgForm;
    component.handleSubmit(mockForm);
    expect(appointmentServiceSpy.add).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should call handleCancel and navigate back', () => {
    component.handleCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
  });

  it('should render patients, doctors and status options in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const patientOptions = compiled.querySelectorAll('#patientId option');
    expect(patientOptions.length).toBe(mockPatients.length + 1);
    expect(patientOptions[1].textContent).toContain('Alice');

    const doctorOptions = compiled.querySelectorAll('#doctorId option');
    expect(doctorOptions.length).toBe(mockDoctors.length + 1);
    expect(doctorOptions[1].textContent).toContain('Dr. John');

    const statusOptions = compiled.querySelectorAll('#status option');
    expect(statusOptions.length).toBe(component.statusOptions.length + 1);
    expect(statusOptions[1].textContent).toContain('Agendado');
  });

  it('should call handleSubmit when form is submitted', () => {
    spyOn(component, 'handleSubmit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {} as any);
    expect(component.handleSubmit).toHaveBeenCalled();
  });

  it('should call handleCancel on cancel button click', () => {
    spyOn(component, 'handleCancel');
    const button = fixture.debugElement.query(By.css('button.btn-secondary'));
    button.nativeElement.click();
    expect(component.handleCancel).toHaveBeenCalled();
  });

  it('should initialize formData.status with Scheduled', () => {
    expect(component.formData.status).toBe(AppointmentStatus.Scheduled);
  });
});
