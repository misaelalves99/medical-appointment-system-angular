// src/app/services/patient.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Patient {
  id: number;
  name: string;
  cpf: string;
  dateOfBirth: string; // ISO string
  email: string;
  phone: string;
  address: string;
  gender: string;
}

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients: Patient[] = [
    {
      id: 1,
      name: "Carlos Oliveira",
      cpf: "123.456.789-00",
      dateOfBirth: "1990-05-15",
      email: "carlos@email.com",
      phone: "3333-3333",
      address: "Rua A, 123",
      gender: "Masculino",
    },
    {
      id: 2,
      name: "Maria Lima",
      cpf: "987.654.321-00",
      dateOfBirth: "1985-10-20",
      email: "maria@email.com",
      phone: "4444-4444",
      address: "Rua B, 456",
      gender: "Feminino",
    },
  ];

  private patientsSubject = new BehaviorSubject<Patient[]>([...this.patients]);

  getPatients(): Observable<Patient[]> {
    return this.patientsSubject.asObservable();
  }

  getById(id: number): Observable<Patient | undefined> {
    return of(this.patients.find(p => p.id === id));
  }

  add(patient: Patient) {
    this.patients.push(patient);
    this.patientsSubject.next([...this.patients]);
  }

  update(updated: Patient) {
    const index = this.patients.findIndex(p => p.id === updated.id);
    if (index !== -1) {
      this.patients[index] = updated;
      this.patientsSubject.next([...this.patients]);
    }
  }

  delete(id: number) {
    this.patients = this.patients.filter(p => p.id !== id);
    this.patientsSubject.next([...this.patients]);
  }
}
