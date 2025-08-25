// src/pages/specialty/create/create-specialty.component.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import necessário
import { CommonModule } from '@angular/common'; // Opcional, mas recomendado

@Component({
  selector: 'app-create-specialty',
  templateUrl: './create-specialty.component.html',
  styleUrls: ['./create-specialty.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // <-- Adicionado FormsModule
})
export class CreateSpecialtyComponent {
  name: string = '';
  @Output() onSubmit = new EventEmitter<string>();

  handleSubmit(): void {
    const trimmedName = this.name.trim();
    if (trimmedName) {
      this.onSubmit.emit(trimmedName);
      this.name = '';
    }
  }
}
