// src/app/services/appointment.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { AppointmentService } from './appointment.service';
import { Appointment, AppointmentStatus } from '../types/appointment.model';

describe('AppointmentService', () => {
  let service: AppointmentService;

  const mockAppointment: Appointment = {
    id: 2,
    patientId: 3,
    patientName: 'Maria Souza',
    doctorId: 4,
    doctorName: 'Dr. Pedro Lima',
    appointmentDate: '2025-08-20T10:00:00Z',
    status: AppointmentStatus.Scheduled,
    notes: 'Primeira consulta.'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial appointments', (done) => {
    service.getAppointments().subscribe((appointments) => {
      expect(appointments.length).toBeGreaterThan(0);
      expect(appointments[0].patientName).toBe('João da Silva');
      done();
    });
  });

  it('should get appointment by id', (done) => {
    service.getById(1).subscribe((appointment) => {
      expect(appointment).toBeDefined();
      expect(appointment!.id).toBe(1);
      done();
    });
  });

  it('should return undefined for non-existing id', (done) => {
    service.getById(999).subscribe((appointment) => {
      expect(appointment).toBeUndefined();
      done();
    });
  });

  it('should add a new appointment', (done) => {
    service.add(mockAppointment);
    service.getAppointments().subscribe((appointments) => {
      const added = appointments.find(a => a.id === mockAppointment.id);
      expect(added).toBeDefined();
      expect(added!.patientName).toBe('Maria Souza');
      done();
    });
  });

  it('should update an existing appointment', (done) => {
    const updated = { ...mockAppointment, notes: 'Consulta reagendada.' };
    service.update(updated);
    service.getById(mockAppointment.id).subscribe((appointment) => {
      expect(appointment!.notes).toBe('Consulta reagendada.');
      done();
    });
  });

  it('should delete an appointment', (done) => {
    service.delete(mockAppointment.id);
    service.getAppointments().subscribe((appointments) => {
      const deleted = appointments.find(a => a.id === mockAppointment.id);
      expect(deleted).toBeUndefined();
      done();
    });
  });
});
