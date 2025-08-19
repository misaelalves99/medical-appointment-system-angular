// src/pages/specialty/create/create-specialty.component.ts

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-specialty',
  templateUrl: './create-specialty.component.html',
  styleUrls: ['./create-specialty.component.css'],
  standalone: true
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
