// src/app/services/doctor.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Doctor {
  id: number;
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

  getDoctors(): Observable<Doctor[]> {
    return this.doctorsSubject.asObservable();
  }

  getById(id: number): Observable<Doctor | undefined> {
    return of(this.doctors.find(d => d.id === id));
  }

  add(doctor: Doctor) {
    this.doctors.push(doctor);
    this.doctorsSubject.next([...this.doctors]);
  }

  update(updated: Doctor) {
    const index = this.doctors.findIndex(d => d.id === updated.id);
    if (index !== -1) {
      this.doctors[index] = updated;
      this.doctorsSubject.next([...this.doctors]);
    }
  }

  delete(id: number) {
    this.doctors = this.doctors.filter(d => d.id !== id);
    this.doctorsSubject.next([...this.doctors]);
  }
}
