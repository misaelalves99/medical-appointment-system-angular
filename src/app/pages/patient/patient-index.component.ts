// src/pages/Patient/patient-index.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Patient } from '../../types/patient.model';
import { PatientService } from '../../services/patient.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-index',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './patient-index.component.html',
  styleUrls: ['./patient-index.component.css']
})
export class PatientIndexComponent implements OnInit {
  private patientService = inject(PatientService);

  patients: Patient[] = [];
  search: string = '';

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe((data: Patient[]) => {
      this.patients = data;
    });
  }

  get filteredPatients(): Patient[] {
    const searchLower = this.search.toLowerCase();
    return this.patients.filter((p) =>
      [p.name, p.cpf, p.email, p.phone].some((field) =>
        field.toLowerCase().includes(searchLower)
      )
    );
  }
}
