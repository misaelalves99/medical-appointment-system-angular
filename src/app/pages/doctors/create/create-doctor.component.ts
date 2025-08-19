// src/pages/Doctors/Create/create-doctor.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Doctor {
  id: number;
  name: string;
  crm: string;
  specialty: string;
  email: string;
  phone: string;
  isActive: boolean;
}

// Mock inicial
export let doctorsMock: Doctor[] = [];

@Component({
  selector: 'app-create-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent {
  form: Doctor = {
    id: 0,
    name: '',
    crm: '',
    specialty: '',
    email: '',
    phone: '',
    isActive: false
  };

  constructor(private router: Router) {}

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    let value: string | boolean = target.value;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      value = target.checked;
    }

    const name = target.name as keyof Doctor;
    this.form = { ...this.form, [name]: value };
  }

  handleSubmit() {
    const newId = doctorsMock.length > 0 ? Math.max(...doctorsMock.map(d => d.id)) + 1 : 1;
    doctorsMock.push({ ...this.form, id: newId });

    console.log('Novo médico adicionado:', { ...this.form, id: newId });
    console.log('Lista atualizada de médicos:', doctorsMock);

    this.router.navigate(['/doctors']);
  }

  cancel() {
    this.router.navigate(['/doctors']);
  }
}
