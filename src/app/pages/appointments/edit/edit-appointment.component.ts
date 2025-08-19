// src/pages/Appointments/Edit/edit-appointment.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import './edit-appointment.component.css';

interface AppointmentForm {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  status: string;
  notes: string;
}

@Component({
  selector: 'app-edit-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-appointment.component.html',
})
export class EditAppointmentComponent {
  formData: AppointmentForm = {
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    status: 'Confirmada',
    notes: ''
  };

  constructor(private router: Router) {}

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const { name, value } = target;
    this.formData = { ...this.formData, [name]: value };
  }

  handleSubmit() {
    console.log('Salvando consulta:', this.formData);
    // Aqui você pode chamar API para salvar
  }

  navigateToList() {
    this.router.navigate(['/appointments']);
  }
}
