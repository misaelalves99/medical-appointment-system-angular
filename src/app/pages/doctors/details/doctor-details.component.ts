// src/pages/Doctors/Details/doctor-details.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Doctor {
  id: number;
  name: string;
  crm: string;
  specialty: string;
  email: string;
  phone: string;
  isActive: boolean;
}

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent {
  @Input() doctor!: Doctor;

  constructor(private router: Router) {}

  onEdit(id: number) {
    this.router.navigate([`/doctors/edit/${id}`]);
  }

  onBack() {
    this.router.navigate(['/doctors']);
  }
}
