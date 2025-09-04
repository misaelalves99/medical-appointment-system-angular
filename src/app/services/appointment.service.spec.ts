// src/app/services/appointment.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { AppointmentService, Appointment, AppointmentStatus } from './appointment.service';

describe('AppointmentService', () => {
  let service: AppointmentService;

  const mockAppointment: Appointment = {
    id: 999, // será sobrescrito pelo service.add
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

  it('should add a new appointment and assign a new id', (done) => {
    service.add(mockAppointment);
    service.getAppointments().subscribe((appointments) => {
      const added = appointments.find(a => a.patientName === 'Maria Souza');
      expect(added).toBeDefined();
      expect(added!.id).not.toBe(999); // id deve ser sobrescrito
      expect(added!.patientName).toBe('Maria Souza');
      done();
    });
  });

  it('should update an existing appointment', (done) => {
    // Primeiro adiciona
    service.add(mockAppointment);
    service.getAppointments().subscribe((appointments) => {
      const added = appointments.find(a => a.patientName === 'Maria Souza');
      expect(added).toBeDefined();

      const updated = { ...added!, notes: 'Consulta reagendada.' };
      service.update(updated);

      service.getById(updated.id).subscribe((appointment) => {
        expect(appointment!.notes).toBe('Consulta reagendada.');
        done();
      });
    });
  });

  it('should delete an appointment', (done) => {
    // Primeiro adiciona
    service.add(mockAppointment);
    service.getAppointments().subscribe((appointments) => {
      const added = appointments.find(a => a.patientName === 'Maria Souza');
      expect(added).toBeDefined();

      service.delete(added!.id);

      service.getAppointments().subscribe((afterDelete) => {
        const deleted = afterDelete.find(a => a.id === added!.id);
        expect(deleted).toBeUndefined();
        done();
      });
    });
  });
});
