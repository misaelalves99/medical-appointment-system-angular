// src/app/pages/doctors/create/create-doctor.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService, Doctor } from '../../../services/doctor.service';
import { SpecialtyService, Specialty } from '../../../services/specialty.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create-doctor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css'],
})
export class CreateDoctorComponent implements OnInit {
  formData: Partial<Doctor> = {
    name: '',
    crm: '',
    specialty: '',
    email: '',
    phone: '',
    isActive: false,
  };

  specialties: Specialty[] = [];

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit(): void {
    // Corrigido: assinando o Observable
    this.specialtyService.getSpecialties()
      .pipe(take(1))
      .subscribe((specialties) => {
        this.specialties = specialties;
      });
  }

  handleSubmit(form: NgForm) {
    if (form.invalid) return;

    // Corrigido: não usamos mais getNextId, pois o service já trata isso
    const newDoctor: Doctor = { ...this.formData } as Doctor;
    this.doctorService.add(newDoctor);

    this.router.navigate(['/doctors']);
  }

  handleCancel() {
    this.router.navigate(['/doctors']);
  }
}
