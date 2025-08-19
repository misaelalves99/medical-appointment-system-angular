// src/pages/Patient/Create/create-patient.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PatientCreateForm {
  name: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-create-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent {
  formData: PatientCreateForm = {
    name: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: ''
  };

  handleSubmit(): void {
    // Aqui você faria a chamada à API para criar o paciente
    console.log('Dados enviados:', this.formData);
  }
}
