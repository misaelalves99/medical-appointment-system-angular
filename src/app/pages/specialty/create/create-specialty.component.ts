// src/app/pages/specialty/create/create-specialty.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SpecialtyService, Specialty } from '../../../services/specialty.service';

@Component({
  selector: 'app-create-specialty',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-specialty.component.html',
  styleUrls: ['./create-specialty.component.css'],
})
export class CreateSpecialtyComponent {
  name: string = '';

  constructor(private specialtyService: SpecialtyService, private router: Router) {}

  handleSubmit(form: NgForm) {
    if (form.invalid) return;

    const trimmedName = this.name.trim();
    if (trimmedName) {
      // Usando a versão atualizada do service
      this.specialtyService.add({ name: trimmedName });
      this.name = '';
      this.router.navigate(['/specialty']);
    }
  }

  handleCancel() {
    this.router.navigate(['/specialty']);
  }
}
