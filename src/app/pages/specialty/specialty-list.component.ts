// src/pages/specialty/specialty-list.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Specialty } from '../../types/specialty.model';
import { SpecialtyService } from '../../services/specialty.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specialty-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.css']
})
export class SpecialtyListComponent implements OnInit {
  private specialtyService = inject(SpecialtyService);
  private router = inject(Router);

  specialties: Specialty[] = [];
  filter: string = '';

  ngOnInit(): void {
    this.loadSpecialties();
  }

  loadSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe((data: Specialty[]) => {
      this.specialties = data;
    });
  }

  get filteredSpecialties(): Specialty[] {
    const filterLower = this.filter.toLowerCase();
    return this.specialties
      .filter(
        (s) =>
          s.name.toLowerCase().includes(filterLower) ||
          s.id.toString().includes(this.filter)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }
}
