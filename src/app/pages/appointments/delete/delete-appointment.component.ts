// src/app/pages/appointments/delete/delete-appointment.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService, Appointment } from '../../../services/appointment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-appointment.component.html',
  styleUrls: ['./delete-appointment.component.css'],
})
export class DeleteAppointmentComponent implements OnInit {
  appointment: Appointment | null = null;
  private sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : undefined;

    if (id != null) {
      // inscrevendo-se no Observable para pegar todos os appointments
      this.sub.add(
        this.appointmentService.getAppointments().subscribe((appointments) => {
          this.appointment = appointments.find(a => a.id === id) ?? null;
        })
      );
    }
  }

  get formattedDate(): string {
    if (!this.appointment) return '';
    const date = new Date(this.appointment.appointmentDate);
    return date.toLocaleDateString();
  }

  get formattedTime(): string {
    if (!this.appointment) return '';
    const date = new Date(this.appointment.appointmentDate);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  handleDelete(): void {
    if (this.appointment) {
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
