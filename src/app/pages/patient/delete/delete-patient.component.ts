// src/pages/patient/delete/delete-patient.component.ts

// src/pages/patient/delete/delete-patient.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Patient } from '../../../types/patient.model';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-delete-patient',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css']
})
export class DeletePatientComponent implements OnInit {
  private patientService = inject(PatientService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  patient: Patient | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getById(id).subscribe((p) => {
      this.patient = p ?? null;
    });
  }

  handleSubmit(): void {
    if (this.patient && confirm(`Confirma exclusão do paciente: ${this.patient.name}?`)) {
      this.patientService.delete(this.patient.id!); // <-- uso do '!'
      this.router.navigate(['/patient']);
    }
  }

  handleCancel(): void {
    this.router.navigate(['/patient']);
  }
}
