// src/app/pages/patient/edit/edit-patient.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService, Patient } from '../../../services/patient.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css'],
})
export class EditPatientComponent implements OnInit {
  formData: Partial<Patient> = {
    name: '',
    cpf: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
  };
  patientId!: number;
  existingPatient?: Patient;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));

    // Assinando o Observable para obter o paciente
    this.patientService.getById(this.patientId)
      .pipe(take(1)) // pega apenas um valor e completa
      .subscribe((patient) => {
        if (patient) {
          this.existingPatient = patient;
          this.formData = { ...patient };
        } else {
          // Caso não encontre, redireciona para a lista de pacientes
          this.router.navigate(['/patient']);
        }
      });
  }

  handleSubmit(form: NgForm) {
    if (!this.existingPatient || form.invalid) return;

    const updatedPatient: Patient = { ...this.formData, id: this.existingPatient.id } as Patient;
    this.patientService.update(updatedPatient);
    this.router.navigate(['/patient']);
  }

  handleCancel() {
    this.router.navigate(['/patient']);
  }
}
