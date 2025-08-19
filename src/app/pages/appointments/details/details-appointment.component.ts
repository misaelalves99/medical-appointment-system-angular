// src/pages/Appointment/Details/details-appointment.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import './details-appointment.component.css';

export interface Appointment {
  id: number;
  patientId: number;
  patient?: { fullName: string };
  doctorId: number;
  doctor?: { fullName: string };
  appointmentDate: string; // ISO date string
  status: string;
  notes?: string;
}

@Component({
  selector: 'app-details-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-appointment.component.html',
})
export class DetailsAppointmentComponent {
  appointment!: Appointment;

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Simulação de dados — substitua por API real posteriormente
    this.appointment = {
      id,
      patientId: 1,
      patient: { fullName: 'João da Silva' },
      doctorId: 2,
      doctor: { fullName: 'Dra. Maria Oliveira' },
      appointmentDate: '2025-08-15T14:30',
      status: 'Confirmada',
      notes: 'Paciente apresentou melhora significativa.'
    };
  }

  navigateToEdit() {
    this.router.navigate([`/appointments/edit/${this.appointment.id}`]);
  }

  navigateToList() {
    this.router.navigate(['/appointments']);
  }
}
