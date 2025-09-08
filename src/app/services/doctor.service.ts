// src/app/services/doctor.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Doctor {
  id?: number;
  name: string;
  crm: string;
  specialty: string;
  email: string;
  phone: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private doctorsSubject = new BehaviorSubject<Doctor[]>([
    {
      id: 1,
      name: "Dr. João Silva",
      crm: "123456",
      specialty: "Cardiologia",
      email: "joao.silva@hospital.com",
      phone: "(11) 99999-9999",
      isActive: true,
    },
    {
      id: 2,
      name: "Dra. Ana Paula",
      crm: "654321",
      specialty: "Dermatologia",
      email: "ana.paula@hospital.com",
      phone: "(11) 98888-8888",
      isActive: true,
    },
  ]);

  // Observable público para todos os componentes assinarem
  public doctors$ = this.doctorsSubject.asObservable();

  /** Retorna todos os médicos como Observable */
  getDoctors(): Observable<Doctor[]> {
    return this.doctors$;
  }

  /** Retorna um médico por ID */
  getById(id: number): Doctor | undefined {
    return this.doctorsSubject.value.find(d => d.id === id);
  }

  /** Adiciona um novo médico com ID automático */
  add(doctor: Omit<Doctor, 'id'>): void {
    const newId = this.doctorsSubject.value.length
      ? Math.max(...this.doctorsSubject.value.map(d => d.id ?? 0)) + 1
      : 1;
    const newDoctor: Doctor = { ...doctor, id: newId };
    this.doctorsSubject.next([...this.doctorsSubject.value, newDoctor]);
  }

  /** Atualiza um médico existente */
  update(updated: Doctor): void {
    if (!updated.id) return;
    const updatedList = this.doctorsSubject.value.map(d =>
      d.id === updated.id ? { ...updated } : d
    );
    this.doctorsSubject.next(updatedList);
  }

  /** Remove um médico pelo ID */
  delete(id: number): void {
    const filteredList = this.doctorsSubject.value.filter(d => d.id !== id);
    this.doctorsSubject.next(filteredList);
  }
}
