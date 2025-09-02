// src/app/pages/specialty/delete/delete-specialty.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialtyService, Specialty } from '../../../services/specialty.service';

@Component({
  selector: 'app-delete-specialty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-specialty.component.html',
  styleUrls: ['./delete-specialty.component.css']
})
export class DeleteSpecialtyComponent implements OnInit {
  specialty: Specialty | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : undefined;

    if (id != null) {
      // usar o método correto do serviço
      this.specialty = this.specialtyService.getSpecialtyById(id) ?? null;
    }
  }

  handleDelete(): void {
    if (this.specialty && this.specialty.id != null) {
      this.specialtyService.deleteSpecialty(this.specialty.id);
      console.log('Especialidade excluída:', this.specialty);
      this.router.navigate(['/specialty']);
    }
  }

  handleCancel(): void {
    this.router.navigate(['/specialty']);
  }
}
