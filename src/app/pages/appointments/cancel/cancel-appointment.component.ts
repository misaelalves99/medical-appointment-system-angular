// src/app/pages/appointments/cancel/cancel-appointment.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Patient {
  id: number;
  fullName?: string;
}

interface Doctor {
  id: number;
  fullName?: string;
}

interface Appointment {
  id: number;
  appointmentDate: string; // formato ISO
  patient?: Patient;
  patientId: number;
  doctor?: Doctor;
  doctorId: number;
}

@Component({
  selector: 'app-cancel-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancel-appointment.component.html',
  styleUrls: ['./cancel-appointment.component.css']
})
export class CancelAppointmentComponent {
  @Input() appointment!: Appointment;
  @Output() cancelEvent = new EventEmitter<number>();
  @Output() backEvent = new EventEmitter<void>();

  handleCancel(): void {
    if (this.appointment) {
      this.cancelEvent.emit(this.appointment.id);
    }
  }

  handleBack(): void {
    this.backEvent.emit();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('pt-BR');
  }
}
