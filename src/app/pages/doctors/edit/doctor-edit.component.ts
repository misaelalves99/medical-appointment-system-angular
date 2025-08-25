// src/pages/Doctors/Edit/doctor-edit.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// ⚡ Exportando a interface Doctor para testes e outros componentes
export interface Doctor {
  id: number;
  name: string;
  crm: string;
  specialty: string;
  email: string;
  phone: string;
  isActive: boolean;
}

@Component({
  selector: 'app-doctor-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent {
  @Input() doctor!: Doctor;

  form!: Doctor;

  constructor(private router: Router) {}

  ngOnInit() {
    // Inicializa o formulário com os dados do médico
    this.form = { ...this.doctor };
  }

  onSave() {
    console.log('Salvar alterações:', this.form);
    // Aqui você pode implementar atualização no mock ou API
    this.router.navigate(['/doctors']);
  }

  onCancel() {
    this.router.navigate(['/doctors']);
  }
}
