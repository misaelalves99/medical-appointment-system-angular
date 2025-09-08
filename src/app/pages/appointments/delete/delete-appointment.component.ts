// src/app/pages/appointments/delete/delete-appointment.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService, Appointment } from '../../../services/appointment.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-appointment.component.html',
  styleUrls: ['./delete-appointment.component.css'],
})
export class DeleteAppointmentComponent implements OnInit, OnDestroy {
  appointment: Appointment | null = null;
  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id !== null) {
      this.sub.add(
        this.appointmentService.getAppointments().subscribe(appointments => {
          this.appointment = appointments.find(a => a.id === id) ?? null;
          if (!this.appointment) {
            console.warn(`Agendamento com ID ${id} não encontrado. Redirecionando.`);
            this.router.navigate(['/appointments']);
          }
        })
      );
    } else {
      console.warn('ID inválido. Redirecionando.');
      this.router.navigate(['/appointments']);
    }
  }

  get formattedDate(): string {
    if (!this.appointment) return '';
    return new Date(this.appointment.appointmentDate).toLocaleDateString();
  }

  get formattedTime(): string {
    if (!this.appointment) return '';
    return new Date(this.appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  handleDelete(): void {
    if (this.appointment?.id != null) {
      this.appointmentService.delete(this.appointment.id);
      this.router.navigate(['/appointments']);
    }
  }

  handleCancel(): void {
    this.router.navigate(['/appointments']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
