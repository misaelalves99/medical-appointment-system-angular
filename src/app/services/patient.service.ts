import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Patient {
  id?: number;
  name: string;
  cpf: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  gender?: string;
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
  patients$ = this.patientsSubject.asObservable();

  /** 🔹 Retorna todos os pacientes como Observable */
  getPatients(): Observable<Patient[]> {
    return this.patients$;
  }

  /** 🔹 Retorna paciente por ID */
  getById(id: number): Observable<Patient | undefined> {
    return of(this.patients.find(p => p.id === id));
  }

  /** 🔹 Retorna próximo ID disponível */
  getNextId(): number {
    return this.patients.length
      ? Math.max(...this.patients.map(p => p.id ?? 0)) + 1
      : 1;
  }

  /** 🔹 Adiciona paciente */
  add(patient: Patient) {
    const newPatient: Patient = { ...patient, id: this.getNextId() };
    this.patients.push(newPatient);
    this.patientsSubject.next([...this.patients]);
  }

  /** 🔹 Atualiza paciente */
  update(updated: Patient) {
    if (updated.id == null) return;
    const index = this.patients.findIndex(p => p.id === updated.id);
    if (index !== -1) {
      this.patients[index] = { ...updated };
      this.patientsSubject.next([...this.patients]);
    }
  }

  /** 🔹 Remove paciente */
  delete(id: number) {
    this.patients = this.patients.filter(p => p.id !== id);
    this.patientsSubject.next([...this.patients]);
  }
}
