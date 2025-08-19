// src/pages/specialty/edit/edit-specialty.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-specialty',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-specialty.component.html',
  styleUrls: ['./edit-specialty.component.css']
})
export class EditSpecialtyComponent {
  @Input() id!: number;
  @Input() initialName!: string;
  @Output() onSubmit = new EventEmitter<{ id: number; name: string }>();

  name!: string;
  error: string | null = null;

  ngOnInit() {
    this.name = this.initialName;
  }

  handleSubmit() {
    if (!this.name || this.name.trim() === '') {
      this.error = 'O nome da especialidade é obrigatório.';
      return;
    }
    this.error = null;
    this.onSubmit.emit({ id: this.id, name: this.name.trim() });
  }
}
