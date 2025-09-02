// src/app/pages/specialty/edit/edit-specialty.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialtyService, Specialty } from '../../../services/specialty.service';

@Component({
  selector: 'app-edit-specialty',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-specialty.component.html',
  styleUrls: ['./edit-specialty.component.css'],
})
export class EditSpecialtyComponent implements OnInit {
  id!: number;
  specialty!: Specialty | undefined;
  name: string = '';
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = paramId ? Number(paramId) : 0;
    this.specialty = this.specialtyService.getSpecialtyById(this.id);

    if (this.specialty) {
      this.name = this.specialty.name;
    }
  }

  handleSubmit(form: NgForm) {
    if (form.invalid) return;

    if (!this.name.trim()) {
      this.error = 'O nome da especialidade é obrigatório.';
      return;
    }

    this.error = null;
    if (this.specialty) {
      this.specialtyService.updateSpecialty(this.specialty.id!, this.name.trim());
      this.router.navigate(['/specialty']);
    }
  }

  handleCancel() {
    this.router.navigate(['/specialty']);
  }
}
