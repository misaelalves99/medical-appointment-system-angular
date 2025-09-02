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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/doctors']);
      return;
    }

    this.doctorService.getById(id).subscribe(doc => {
      if (!doc) {
        this.router.navigate(['/doctors']);
      } else {
        this.doctor = doc;
      }
    });
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
