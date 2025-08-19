// src/pages/Doctors/doctor-list.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Doctor } from '../../types/doctor.model';
import { DoctorService } from '../../services/doctor.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  private doctorService = inject(DoctorService);
  private router = inject(Router);

  doctors: Doctor[] = [];
  search: string = '';

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
      this.doctors = data;
    });
  }

  get filteredDoctors(): Doctor[] {
    const searchLower = this.search.toLowerCase();
    return this.doctors.filter((doctor) =>
      Object.values(doctor).some((value) =>
        String(value).toLowerCase().includes(searchLower)
      )
    );
  }

  goToCreate() {
    this.router.navigate(['/doctors/create']);
  }

  goToDetails(id: number) {
    this.router.navigate([`/doctors/details/${id}`]);
  }

  goToEdit(id: number) {
    this.router.navigate([`/doctors/edit/${id}`]);
  }

  goToDelete(id: number) {
    this.router.navigate([`/doctors/delete/${id}`]);
  }
}
