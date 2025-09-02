// src/app/services/specialty.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Specialty {
  id?: number; // id opcional ao criar
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  private specialties: Specialty[] = [
    { id: 1, name: "Cardiologia" },
    { id: 2, name: "Dermatologia" }
  ];

  private specialtiesSubject = new BehaviorSubject<Specialty[]>([...this.specialties]);
  specialties$ = this.specialtiesSubject.asObservable();

  /** Retorna todas as especialidades como Observable */
  getSpecialties(): Observable<Specialty[]> {
    return this.specialties$;
  }

  /** Retorna uma especialidade por ID */
  getSpecialtyById(id: number): Specialty | undefined {
    return this.specialties.find(s => s.id === id);
  }

  /** Adiciona uma nova especialidade */
  addSpecialty(name: string) {
    const newId = (this.specialties[this.specialties.length - 1]?.id ?? 0) + 1;
    const newSpecialty: Specialty = { id: newId, name };
    this.specialties.push(newSpecialty);
    this.specialtiesSubject.next([...this.specialties]);
  }

  /** Atualiza uma especialidade existente */
  updateSpecialty(id: number, name: string) {
    const index = this.specialties.findIndex(s => s.id === id);
    if (index !== -1) {
      this.specialties[index] = { id, name };
      this.specialtiesSubject.next([...this.specialties]);
    }
  }

  /** Remove uma especialidade pelo ID */
  deleteSpecialty(id: number) {
    this.specialties = this.specialties.filter(s => s.id !== id);
    this.specialtiesSubject.next([...this.specialties]);
  }
}
