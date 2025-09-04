// src/pages/Patient/patient-index.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { PatientService, Patient } from '../../services/patient.service';

@Component({
  selector: 'app-patient-index',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './patient-index.component.html',
  styleUrls: ['./patient-index.component.css']
})
export class PatientIndexComponent {
  search: string = '';
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];

  constructor(private router: Router, private patientService: PatientService) {
    this.patientService.patients$.subscribe((p: Patient[]) => {
      this.patients = p;
      this.updateFilteredPatients();
    });
  }

  updateFilteredPatients() {
    const searchLower = this.search.toLowerCase();
    this.filteredPatients = this.patients.filter(p =>
      [
        p.id?.toString() ?? '', 
        p.name ?? '', 
        p.cpf ?? '', 
        p.phone ?? ''
      ].some(field => field.toLowerCase().includes(searchLower))
    );
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
