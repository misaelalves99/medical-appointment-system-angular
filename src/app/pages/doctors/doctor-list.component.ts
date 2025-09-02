// src/pages/Doctors/doctor-list.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { DoctorService, Doctor } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent {
  search: string = '';
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];

  constructor(private router: Router, private doctorService: DoctorService) {
    this.doctorService.doctors$.subscribe((d: Doctor[]) => {
      this.doctors = d;
      this.updateFilteredDoctors();
    });
  }

  updateFilteredDoctors() {
    const searchLower = this.search.toLowerCase();
    this.filteredDoctors = this.doctors.filter(d =>
      [
        d.id?.toString() ?? '',
        d.name ?? '',
        d.crm ?? '',
        d.specialty ?? '',
        d.isActive ? 'sim' : 'não'
      ].some(field => field.toLowerCase().includes(searchLower))
    );
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
