// src/pages/Patient/Create/create-patient.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService, Patient } from '../../../services/patient.service';

interface PatientCreateForm {
  name: string;
  cpf: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-create-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css'],
})
export class CreatePatientComponent {
  private patientService = inject(PatientService);
  private router = inject(Router);

  formData: PatientCreateForm = {
    name: '',
    cpf: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
  };

  handleSubmit(): void {
    const newPatient: Patient = {
      id: Date.now(), // gera um ID simples para simulação
      ...this.formData,
    };

    this.patientService.add(newPatient);

    console.log('Novo paciente cadastrado:', newPatient);

    this.router.navigate(['/patient']); // redireciona para a listagem
  }
}
