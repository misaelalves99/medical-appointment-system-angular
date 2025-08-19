// src/pages/specialty/delete/delete-specialty.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Specialty } from '../../../types/specialty.model';
import { SpecialtyService } from '../../../services/specialty.service';

@Component({
  selector: 'app-delete-specialty',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-specialty.component.html',
  styleUrls: ['./delete-specialty.component.css']
})
export class DeleteSpecialtyComponent implements OnInit {
  private specialtyService = inject(SpecialtyService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  specialty: Specialty | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.specialtyService.getById(id).subscribe((s) => {
      this.specialty = s ?? null;
    });
  }

  handleSubmit(): void {
    if (this.specialty && confirm(`Confirma exclusão da especialidade: ${this.specialty.name}?`)) {
      this.specialtyService.delete(this.specialty.id);
      this.router.navigate(['/specialty']);
    }
  }

  handleCancel(): void {
    this.router.navigate(['/specialty']);
  }
}
