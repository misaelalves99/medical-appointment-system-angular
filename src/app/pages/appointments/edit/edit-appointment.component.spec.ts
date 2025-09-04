// src/pages/Appointments/Edit/edit-appointment.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAppointmentComponent } from './edit-appointment.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AppointmentService, Appointment, AppointmentStatus } from '../../../services/appointment.service';
import { PatientService, Patient } from '../../../services/patient.service';
import { DoctorService, Doctor } from '../../../services/doctor.service';
import { By } from '@angular/platform-browser';

describe('EditAppointmentComponent', () => {
  let component: EditAppointmentComponent;
  let fixture: ComponentFixture<EditAppointmentComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;
  let patientServiceSpy: jasmine.SpyObj<PatientService>;
  let doctorServiceSpy: jasmine.SpyObj<DoctorService>;

  const mockPatients: Patient[] = [
    { id: 1, name: 'Alice', cpf: '000.000.000-00', dateOfBirth: '1990-01-01', email: 'alice@email.com', phone: '1111-1111', address: 'Rua A' },
    { id: 2, name: 'Bob', cpf: '111.111.111-11', dateOfBirth: '1992-02-02', email: 'bob@email.com', phone: '2222-2222', address: 'Rua B' }
  ];

  const mockDoctors: Doctor[] = [
    { id: 10, name: 'Dr. John', crm: '12345', specialty: 'Cardiology', email: 'john@hospital.com', phone: '9999-9999', isActive: true },
    { id: 11, name: 'Dr. Jane', crm: '54321', specialty: 'Dermatology', email: 'jane@hospital.com', phone: '8888-8888', isActive: true }
  ];

  const mockAppointment: Appointment = {
    id: 100,
    patientId: 1,
    doctorId: 10,
    appointmentDate: '2025-08-21T10:30',
    status: AppointmentStatus.Confirmed,
    notes: 'Observação teste',
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', ['getById', 'update']);
    patientServiceSpy = jasmine.createSpyObj('PatientService', ['getPatients']);
    doctorServiceSpy = jasmine.createSpyObj('DoctorService', ['getDoctors']);

    appointmentServiceSpy.getById.and.returnValue(of(mockAppointment));
    patientServiceSpy.getPatients.and.returnValue(of(mockPatients));
    doctorServiceSpy.getDoctors.and.returnValue(of(mockDoctors));

    await TestBed.configureTestingModule({
      imports: [EditAppointmentComponent, FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '100' } } } },
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: DoctorService, useValue: doctorServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load formData with appointment', () => {
    expect(component).toBeTruthy();
    expect(component.formData.patientId).toBe('1');
    expect(component.formData.doctorId).toBe('10');
    expect(component.formData.status).toBe(AppointmentStatus.Confirmed);
    expect(component.formData.notes).toBe('Observação teste');
  });

  it('should populate patients and doctors lists', () => {
    expect(component.patients).toEqual(mockPatients);
    expect(component.doctors).toEqual(mockDoctors);
  });

  it('should submit updated appointment and navigate', () => {
    const formSpy = { invalid: false } as any;
    component.formData.notes = 'Atualizado';
    component.handleSubmit(formSpy);
    expect(appointmentServiceSpy.update).toHaveBeenCalledWith(jasmine.objectContaining({
      id: 100,
      notes: 'Atualizado',
      patientId: 1,
      doctorId: 10
    }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
  });

  it('should not submit if form is invalid', () => {
    const formSpy = { invalid: true } as any;
    component.handleSubmit(formSpy);
    expect(appointmentServiceSpy.update).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to appointments list on cancel', () => {
    component.handleCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments']);
  });

  it('should render form fields with current values', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const patientSelect = compiled.querySelector('#patientId') as HTMLSelectElement;
    const doctorSelect = compiled.querySelector('#doctorId') as HTMLSelectElement;
    const dateInput = compiled.querySelector('#appointmentDate') as HTMLInputElement;
    const statusSelect = compiled.querySelector('#status') as HTMLSelectElement;
    const notesTextarea = compiled.querySelector('#notes') as HTMLTextAreaElement;

    expect(patientSelect.value).toBe('1');
    expect(doctorSelect.value).toBe('10');
    expect(dateInput.value).toBe('2025-08-21T10:30');
    expect(statusSelect.value).toBe(AppointmentStatus.Confirmed);
    expect(notesTextarea.value).toBe('Observação teste');
  });

  it('should call handleSubmit when form is submitted', () => {
    spyOn(component, 'handleSubmit').and.callThrough();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', { invalid: false });
    expect(component.handleSubmit).toHaveBeenCalled();
  });

  it('should call handleCancel on cancel button click', () => {
    spyOn(component, 'handleCancel').and.callThrough();
    const button = fixture.debugElement.query(By.css('button.btn-secondary'));
    button.nativeElement.click();
    expect(component.handleCancel).toHaveBeenCalled();
  });
});
