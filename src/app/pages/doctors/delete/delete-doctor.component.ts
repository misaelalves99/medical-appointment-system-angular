// src/app/pages/doctors/delete/delete-doctor.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService, Doctor } from '../../../services/doctor.service';

@Component({
  selector: 'app-delete-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-doctor.component.html',
  styleUrls: ['./delete-doctor.component.css'],
})
export class DeleteDoctorComponent implements OnInit {
  doctor: Doctor | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : undefined;

    if (id != null) {
      this.doctorService.getById(id).subscribe((doctor) => {
        this.doctor = doctor ?? null;
      });
    }
  }

  handleDelete(): void {
    if (this.doctor && this.doctor.id != null) {
      this.doctorService.delete(this.doctor.id);
      console.log('Médico excluído:', this.doctor);
      this.router.navigate(['/doctors']);
    }
  }

  handleCancel(): void {
    this.router.navigate(['/doctors']);
  }
}
