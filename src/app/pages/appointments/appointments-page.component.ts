// src/app/pages/appointments/appointments-page.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AppointmentService, Appointment, AppointmentStatus } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.css'],
})
export class AppointmentListComponent {
  search: string = '';
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];

  constructor(private router: Router, private appointmentService: AppointmentService) {
    // Subscribing to the service's appointments observable
    this.appointmentService.appointments$.subscribe(a => {
      this.appointments = a;
      this.updateFilteredAppointments();
    });
  }

  // Update filtered appointments based on search
  updateFilteredAppointments() {
    const searchLower = this.search.toLowerCase();
    this.filteredAppointments = this.appointments.filter(a => {
      const dt = new Date(a.appointmentDate);
      const dateStr = dt.toLocaleDateString().toLowerCase();
      const timeStr = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
      const patientStr = a.patientName ? a.patientName.toLowerCase() : '';
      const statusStr = this.getStatusLabel(a.status).toLowerCase();

      return (
        dateStr.includes(searchLower) ||
        timeStr.includes(searchLower) ||
        patientStr.includes(searchLower) ||
        statusStr.includes(searchLower) ||
        String(a.id).includes(searchLower)
      );
    });
  }

  // Map enum to human-readable label
  getStatusLabel(status: AppointmentStatus): string {
    switch(status) {
      case AppointmentStatus.Pending: return 'Pendente';
      case AppointmentStatus.Confirmed: return 'Confirmada';
      case AppointmentStatus.Cancelled: return 'Cancelada';
      case AppointmentStatus.Completed: return 'Concluída';
      default: return status;
    }
  }

  // Navigate to a given path
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  // Delete an appointment after confirmation
  deleteAppointment(id: number) {
    const confirmed = window.confirm('Tem certeza que deseja excluir este agendamento?');
    if (confirmed) {
      this.appointmentService.delete(id);
    }
  }
}
