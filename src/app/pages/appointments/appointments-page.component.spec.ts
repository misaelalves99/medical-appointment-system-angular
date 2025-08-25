// src/app/pages/appointments/appointments-page.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentsPageComponent } from './appointments-page.component';
import { AppointmentService } from '../../services/appointment.service';
import { of } from 'rxjs';
import { Appointment, AppointmentStatus } from '../../types/appointment.model';
import { FormsModule } from '@angular/forms';

describe('AppointmentsPageComponent', () => {
  let component: AppointmentsPageComponent;
  let fixture: ComponentFixture<AppointmentsPageComponent>;
  let appointmentServiceSpy: jasmine.SpyObj<AppointmentService>;

  const mockAppointments: Appointment[] = [
    { id: 1, patientId: 101, doctorId: 201, appointmentDate: '2025-08-21T10:00', status: AppointmentStatus.Scheduled },
    { id: 2, patientId: 102, doctorId: 202, appointmentDate: '2025-08-21T12:00', status: AppointmentStatus.Confirmed },
  ];

  beforeEach(async () => {
    appointmentServiceSpy = jasmine.createSpyObj('AppointmentService', ['getAppointments', 'delete']);
    appointmentServiceSpy.getAppointments.and.returnValue(of(mockAppointments));

    await TestBed.configureTestingModule({
      imports: [AppointmentsPageComponent, FormsModule],
      providers: [{ provide: AppointmentService, useValue: appointmentServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and load appointments', () => {
    expect(component).toBeTruthy();
    expect(component.loading).toBeFalse();
    expect(component.appointments.length).toBe(2);
  });

  it('should filter appointments by patientId', () => {
    component.search = '101';
    const filtered = component.filteredAppointments;
    expect(filtered.length).toBe(1);
    expect(filtered[0].patientId).toBe(101);
  });

  it('should filter appointments by status', () => {
    component.search = 'confirmada';
    const filtered = component.filteredAppointments;
    expect(filtered.length).toBe(1);
    expect(filtered[0].status).toBe(AppointmentStatus.Confirmed);
  });

  it('should delete appointment if confirm returns true', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.handleDelete(1);

    expect(appointmentServiceSpy.delete).toHaveBeenCalledWith(1);
    expect(component.appointments.length).toBe(1);
    expect(component.appointments.find(a => a.id === 1)).toBeUndefined();
  });

  it('should not delete appointment if confirm returns false', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.handleDelete(1);

    expect(appointmentServiceSpy.delete).not.toHaveBeenCalled();
    expect(component.appointments.length).toBe(2);
  });

  it('should return status label', () => {
    const label = component.getStatusLabel(AppointmentStatus.Scheduled);
    expect(label.toLowerCase()).toContain('agendada');
  });
});
