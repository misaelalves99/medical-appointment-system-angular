// src/pages/patient/edit/edit-patient.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

export interface PatientEditForm {
  id: number;
  name: string;
  cpf: string;
  dateOfBirth: string; // ISO date string
  email: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css'],
  standalone: true
})
export class EditPatientComponent {
  @Input() initialData!: PatientEditForm;
  @Output() onSave = new EventEmitter<PatientEditForm>();

  formData!: PatientEditForm;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formData = { ...this.initialData };
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    (this.formData as any)[name] = value;
  }

  handleSubmit(): void {
    this.onSave.emit(this.formData);
  }

  goBack(): void {
    this.router.navigate(['/patient']);
  }
}
