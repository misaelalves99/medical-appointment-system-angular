// src/app/pages/patient/create/create-patient.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService, Patient } from '../../../services/patient.service';

@Component({
  selector: 'app-create-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css'],
})
export class CreatePatientComponent {
  formData: Partial<Patient> = {
    name: '',
    cpf: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
  };

  constructor(private router: Router, private patientService: PatientService) {}

  handleSubmit(form: NgForm) {
    if (form.invalid) return;

    // Cria novo paciente usando add() que gera ID automaticamente
    this.patientService.add(this.formData as Patient);

    this.router.navigate(['/patient']);
  }

  handleCancel() {
    this.router.navigate(['/patient']);
  }
}
