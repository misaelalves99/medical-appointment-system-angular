// src/pages/specialty/details/details-specialty.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpecialtyService, Specialty } from '../../../services/specialty.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-details-specialty',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details-specialty.component.html',
  styleUrls: ['./details-specialty.component.css']
})
export class DetailsSpecialtyComponent implements OnInit {
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
      console.warn('ID inválido. Redirecionando para lista de especialidades.');
      this.router.navigate(['/specialty']);
    }
  }
}
