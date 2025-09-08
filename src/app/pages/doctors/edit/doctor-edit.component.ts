// src/app/pages/doctors/edit/doctor-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService, Doctor } from '../../../services/doctor.service';
import { SpecialtyService, Specialty } from '../../../services/specialty.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-doctor-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css'],
})
export class DoctorEditComponent implements OnInit {
  doctorId!: number;
  form!: Doctor | null;
  specialties: Specialty[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit(): void {
    // Pega lista de especialidades
    this.specialtyService.getSpecialties()
      .pipe(take(1))
      .subscribe((specialties) => {
        this.specialties = specialties;
      });

    // Pega o ID da rota e carrega o médico
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.doctorId = Number(id);
        const found = this.doctorService.getById(this.doctorId);
        if (found) {
          this.form = { ...found };
        } else {
          this.router.navigate(['/doctors']);
        }
      }
    });
  }

  onSave(): void {
    if (!this.form) return;
    this.doctorService.update(this.form);
    this.router.navigate(['/doctors']);
  }

  onCancel(): void {
    this.router.navigate(['/doctors']);
  }
}
