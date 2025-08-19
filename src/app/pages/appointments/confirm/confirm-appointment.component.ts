// src/app/pages/appointment/confirm/confirm-appointment.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

export interface Appointment {
  id: number;
  patientId: number;
  patient?: { fullName: string };
  doctorId: number;
  doctor?: { fullName: string };
  appointmentDate: string;
}

@Component({
  selector: 'app-confirm-appointment',
  standalone: true,
  templateUrl: './confirm-appointment.component.html',
  styleUrls: ['./confirm-appointment.component.css']
})
export class ConfirmAppointmentComponent {
  @Input() appointment!: Appointment;
  @Output() confirm = new EventEmitter<number>();

  constructor(private router: Router) {}

  handleConfirm(event: Event): void {
    event.preventDefault();
    if (this.appointment) {
      this.confirm.emit(this.appointment.id);
    }
  }

  handleBack(): void {
    this.router.navigate(['/appointments']);
  }
}
