// src/pages/specialty/specialty-list.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Specialty, SpecialtyService } from '../../services/specialty.service';

@Component({
  selector: 'app-specialty-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.css']
})
export class SpecialtyListComponent {
  filter: string = '';
  specialties: Specialty[] = [];
  filteredSpecialties: Specialty[] = [];

  constructor(private router: Router, private specialtyService: SpecialtyService) {
    this.specialtyService.specialties$.subscribe(s => {
      this.specialties = s;
      this.updateFilteredSpecialties();
    });
  }

  updateFilteredSpecialties() {
    const filterLower = this.filter.toLowerCase();
    this.filteredSpecialties = this.specialties
      .filter(s =>
        (s.name?.toLowerCase().includes(filterLower)) ||
        (s.id?.toString().includes(filterLower))
      )
      .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
