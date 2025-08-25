// src/pages/patient/edit/edit-patient.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- Import necessário
import { CommonModule } from '@angular/common'; // Opcional, mas recomendado para ngIf/ngFor etc.

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
  standalone: true,
  imports: [CommonModule, FormsModule] // <-- Adicionado FormsModule
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
