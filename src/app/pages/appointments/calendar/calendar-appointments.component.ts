// src/app/pages/appointments/calendar/calendar-appointments.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment, AppointmentStatus } from '../../../types/appointment.model';

@Component({
  selector: 'app-calendar-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-appointments.component.html',
  styleUrls: ['./calendar-appointments.component.css']
})
export class CalendarAppointmentsComponent {
  @Input() appointments: Appointment[] = [];
  @Input() onBack!: () => void;

  statusToString(status: AppointmentStatus): string {
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
        return 'Desconhecido';
    }
  }

  get sortedAppointments(): Appointment[] {
    return [...this.appointments].sort(
      (a, b) =>
        new Date(a.appointmentDate).getTime() -
        new Date(b.appointmentDate).getTime()
    );
  }
}
