// src/pages/appointments/delete/delete-appointment.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Appointment, AppointmentStatus } from '../../../types/appointment.model';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
  selector: 'app-delete-appointment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-appointment.component.html',
  styleUrls: ['./delete-appointment.component.css'],
})
export class DeleteAppointmentComponent implements OnInit {
  private appointmentService = inject(AppointmentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  appointment: Appointment | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.appointmentService.getById(id).subscribe((appt) => {
      this.appointment = appt ?? null;
    });
  }

  handleSubmit(): void {
    if (this.appointment && confirm(`Confirma exclusão da consulta?`)) {
      this.appointmentService.delete(this.appointment.id);
      this.router.navigate(['/appointments']);
    }
  }

  navigateToAppointments(): void {
    this.router.navigate(['/appointments']);
  }

  getStatusLabel(status: AppointmentStatus | undefined): string {
    if (status === undefined) return 'Desconhecido';

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
}
