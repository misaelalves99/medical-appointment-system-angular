// src/utils/enum-helpers.spec.ts

import { getAppointmentStatusLabel } from './enum-helpers';
import { AppointmentStatus } from '../types/appointment.model';

describe('getAppointmentStatusLabel', () => {

  it('should return "Agendada" for AppointmentStatus.Scheduled', () => {
    expect(getAppointmentStatusLabel(AppointmentStatus.Scheduled)).toBe('Agendada');
  });

  it('should return "Confirmada" for AppointmentStatus.Confirmed', () => {
    expect(getAppointmentStatusLabel(AppointmentStatus.Confirmed)).toBe('Confirmada');
  });

  it('should return "Cancelada" for AppointmentStatus.Cancelled', () => {
    expect(getAppointmentStatusLabel(AppointmentStatus.Cancelled)).toBe('Cancelada');
  });

  it('should return "Concluída" for AppointmentStatus.Completed', () => {
    expect(getAppointmentStatusLabel(AppointmentStatus.Completed)).toBe('Concluída');
  });

  it('should return string of unknown status if not matched', () => {
    expect(getAppointmentStatusLabel(999 as AppointmentStatus)).toBe('999');
  });
});
