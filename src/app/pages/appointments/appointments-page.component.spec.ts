// src/app/pages/appointments/appointments-page.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentListComponent } from './appointments-page.component';
import { AppointmentService, Appointment, AppointmentStatus } from '../../services/appointment.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('AppointmentListComponent', () => {
  let component: AppointmentListComponent;
  let fixture: ComponentFixture<AppointmentListComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;

  const mockAppointments: Appointment[] = [
    { id: 1, patientId: 101, doctorId: 201, appointmentDate: '2025-08-21T10:00', status: AppointmentStatus.Scheduled, patientName: 'Alice' },
    { id: 2, patientId: 102, doctorId: 202, appointmentDate: '2025-08-21T12:00', status: AppointmentStatus.Confirmed, patientName: 'Bob' },
  ];

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const appointmentsSubject = new BehaviorSubject<Appointment[]>(mockAppointments);
    appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', ['delete'], { appointments$: appointmentsSubject.asObservable() });

    await TestBed.configureTestingModule({
      imports: [AppointmentListComponent, FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AppointmentService, useValue: appointmentServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and load appointments', () => {
    expect(component).toBeTruthy();
    expect(component.appointments.length).toBe(2);
    expect(component.filteredAppointments.length).toBe(2);
  });

  it('should filter appointments by patientId', () => {
    component.search = '101';
    component.updateFilteredAppointments();
    expect(component.filteredAppointments.length).toBe(1);
    expect(component.filteredAppointments[0].patientId).toBe(101);
  });

  it('should filter appointments by status', () => {
    component.search = 'confirmada';
    component.updateFilteredAppointments();
    expect(component.filteredAppointments.length).toBe(1);
    expect(component.filteredAppointments[0].status).toBe(AppointmentStatus.Confirmed);
  });

  it('should filter appointments by date', () => {
    const dateStr = new Date('2025-08-21T12:00').toLocaleDateString();
    component.search = dateStr;
    component.updateFilteredAppointments();
    expect(component.filteredAppointments.length).toBe(2);
  });

  it('should return correct status label', () => {
    expect(component.getStatusLabel(AppointmentStatus.Pending)).toBe('Pendente');
    expect(component.getStatusLabel(AppointmentStatus.Confirmed)).toBe('Confirmada');
    expect(component.getStatusLabel(AppointmentStatus.Cancelled)).toBe('Cancelada');
    expect(component.getStatusLabel(AppointmentStatus.Completed)).toBe('Concluída');
  });

  it('should navigate to given path', () => {
    component.navigateTo('/appointments/create');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/appointments/create']);
  });

  it('should delete appointment if confirm returns true', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteAppointment(1);
    expect(appointmentServiceSpy.delete).toHaveBeenCalledWith(1);
  });

  it('should not delete appointment if confirm returns false', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteAppointment(1);
    expect(appointmentServiceSpy.delete).not.toHaveBeenCalled();
  });

  it('should render table rows and buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);

    const firstRow = rows[0];
    expect(firstRow.textContent).toContain('1');
    expect(firstRow.textContent).toContain('Alice');

    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
