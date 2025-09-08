// src/pages/Doctors/Details/doctor-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService, Doctor } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  doctor?: Doctor;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : undefined;

    if (!id) {
      this.router.navigate(['/doctors']);
      return;
    }

    const found = this.doctorService.getById(id);
    if (!found) {
      this.router.navigate(['/doctors']);
    } else {
      this.doctor = found;
    }
  }

  onEdit() {
    if (this.doctor?.id) {
      this.router.navigate(['/doctors/edit', this.doctor.id]);
    }
  }

  onBack() {
    this.router.navigate(['/doctors']);
  }
}
