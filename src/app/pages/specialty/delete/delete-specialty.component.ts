// src/app/pages/specialty/delete/delete-specialty.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpecialtyService, Specialty } from '../../../services/specialty.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-specialty',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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
      const found = this.specialtyService.getById(id);
      this.specialty = found ?? null;

      if (!this.specialty) {
        console.warn(`Especialidade com ID ${id} não encontrada. Redirecionando.`);
        this.router.navigate(['/specialty']);
      }
    } else {
      console.warn('ID inválido. Redirecionando.');
      this.router.navigate(['/specialty']);
    }
  }

  handleDelete(): void {
    if (this.specialty?.id != null) {
      this.specialtyService.delete(this.specialty.id);
      console.log('Especialidade excluída:', this.specialty);
      this.router.navigate(['/specialty']);
    }
  }

  handleCancel(): void {
    this.router.navigate(['/specialty']);
  }
}
