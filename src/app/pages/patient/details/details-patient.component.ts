// src/app/pages/patient/details/details-patient.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient, PatientService } from '../../../services/patient.service';
import { CommonModule } from '@angular/common'; // necessário para *ngIf, *ngFor

@Component({
  selector: 'app-details-patient',
  templateUrl: './details-patient.component.html',
  styleUrls: ['./details-patient.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DetailsPatientComponent implements OnInit {
  patient?: Patient;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id != null) {
      this.patientService.getById(id).subscribe(p => {
        if (p) {
          this.patient = p;
        } else {
          alert('Paciente não encontrado!');
          this.goBack();
        }
        this.loading = false;
      });
    } else {
      alert('ID inválido!');
      this.goBack();
    }
  }

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR');
  }

  goToEdit(): void {
    if (this.patient?.id != null) {
      this.router.navigate([`/patient/edit/${this.patient.id}`]);
    }
  }

  goBack(): void {
    this.router.navigate(['/patient']);
  }
}
