// src/app/pages/patient/delete/delete-patient.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService, Patient } from '../../../services/patient.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-delete-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css'],
})
export class DeletePatientComponent implements OnInit {
  patient: Patient | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : undefined;

    if (id != null) {
      this.patientService.getById(id).subscribe((patient) => {
        this.patient = patient ?? null;
      });
    }
  }

  handleDelete(): void {
    if (this.patient && this.patient.id != null) {
      this.patientService.delete(this.patient.id);
      console.log('Paciente excluído:', this.patient);
      this.router.navigate(['/patient']);
    }
  }

  handleCancel(): void {
    this.router.navigate(['/patient']);
  }
}
