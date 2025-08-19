// src/pages/Doctors/Delete/delete-doctor.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Doctor } from '../../../types/doctor.model';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-delete-doctor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-doctor.component.html',
  styleUrls: ['./delete-doctor.component.css']
})
export class DeleteDoctorComponent implements OnInit {
  private doctorService = inject(DoctorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  doctor: Doctor | null = null;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.doctorService.getById(id).subscribe((d) => {
      this.doctor = d ?? null; // transforma undefined em null
    });
  }

  handleDelete() {
    if (this.doctor) {
      if (confirm(`Confirma exclusão do médico: ${this.doctor.name}?`)) {
        this.doctorService.delete(this.doctor.id);
        this.router.navigate(['/doctors']);
      }
    }
  }

  cancel() {
    this.router.navigate(['/doctors']);
  }
}
