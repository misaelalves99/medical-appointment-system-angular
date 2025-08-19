// src/app/pages/appointments/appointments-page.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Appointment, AppointmentStatus } from '../../types/appointment.model';
import { AppointmentService } from '../../services/appointment.service';
import { getAppointmentStatusLabel } from '../../utils/enum-helpers';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.css'],
})
export class AppointmentsPageComponent implements OnInit {
  private appointmentService = inject(AppointmentService);

  appointments: Appointment[] = [];
  loading = true;
  search = '';

  ngOnInit(): void {
    this.loading = true;
    this.appointmentService.getAppointments().subscribe((data) => {
      this.appointments = data;
      this.loading = false;
    });
  }

  handleDelete(id: number) {
    if (!confirm('Confirma exclusão da consulta?')) return;

    this.appointmentService.delete(id);
    // atualiza a lista localmente
    this.appointments = this.appointments.filter((a) => a.id !== id);
  }

  get filteredAppointments() {
    const searchLower = this.search.toLowerCase();

    return this.appointments.filter((a) => {
      const dt = new Date(a.appointmentDate);
      const dateStr = dt.toLocaleDateString().toLowerCase();
      const timeStr = dt
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        .toLowerCase();
      const patientStr = a.patientId ? `paciente id: ${a.patientId}` : '';
      const doctorStr = a.doctorId ? `médico id: ${a.doctorId}` : '';
      const statusStr = getAppointmentStatusLabel(a.status).toLowerCase();

      return (
        dateStr.includes(searchLower) ||
        timeStr.includes(searchLower) ||
        patientStr.includes(searchLower) ||
        doctorStr.includes(searchLower) ||
        statusStr.includes(searchLower)
      );
    });
  }

  getStatusLabel(status: AppointmentStatus) {
    return getAppointmentStatusLabel(status);
  }
}
