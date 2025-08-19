// src/utils/enum-helpers.ts

import { AppointmentStatus } from '../types/appointment.model';

/**
 * Retorna o rótulo legível de um status de consulta.
 * @param status Status da consulta (enum AppointmentStatus)
 * @returns string legível
 */
export function getAppointmentStatusLabel(status: AppointmentStatus): string {
  switch (status) {
    case AppointmentStatus.Scheduled:
      return 'Agendada';
    case AppointmentStatus.Confirmed:
      return 'Confirmada';
    case AppointmentStatus.Cancelled:
      return 'Cancelada';
    case AppointmentStatus.Completed:
      return 'Concluída';
    default:
      return String(status);
  }
}
