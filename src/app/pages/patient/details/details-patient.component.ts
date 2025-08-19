// src/pages/patient/details/details-patient.component.ts

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string; // ISO date string
  gender: string;
  phone?: string;
  email?: string;
  // profilePicturePath?: string; // Uncomment if using photo
}

@Component({
  selector: 'app-details-patient',
  templateUrl: './details-patient.component.html',
  styleUrls: ['./details-patient.component.css'],
  standalone: true
})
export class DetailsPatientComponent {
  @Input() patient!: Patient;

  constructor(private router: Router) {}

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR');
  }

  goToEdit(): void {
    this.router.navigate([`/patient/edit/${this.patient.id}`]);
  }

  goBack(): void {
    this.router.navigate(['/patient']);
  }
}
