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
  private doctors: Doctor[] = [
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
  ];

  private doctorsSubject = new BehaviorSubject<Doctor[]>([...this.doctors]);
  public doctors$ = this.doctorsSubject.asObservable();

  /** Retorna todos os médicos como Observable */
  getDoctors(): Observable<Doctor[]> {
    return this.doctors$;
  }

  /** Retorna um médico por ID */
  getById(id: number): Observable<Doctor | undefined> {
    return of(this.doctors.find(d => d.id === id));
  }

  /** Adiciona um novo médico com ID automático */
  add(doctor: Doctor) {
    const newId = this.doctors.length
      ? Math.max(...this.doctors.map(d => d.id ?? 0)) + 1
      : 1;
    const newDoctor = { ...doctor, id: newId };
    this.doctors.push(newDoctor);
    this.doctorsSubject.next([...this.doctors]);
  }

  /** Atualiza um médico existente */
  update(updated: Doctor) {
    if (!updated.id) return;
    const index = this.doctors.findIndex(d => d.id === updated.id);
    if (index !== -1) {
      this.doctors[index] = { ...updated };
      this.doctorsSubject.next([...this.doctors]);
    }
  }

  /** Remove um médico pelo ID */
  delete(id: number) {
    this.doctors = this.doctors.filter(d => d.id !== id);
    this.doctorsSubject.next([...this.doctors]);
  }
}
