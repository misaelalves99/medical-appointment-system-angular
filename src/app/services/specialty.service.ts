// src/app/services/specialty.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
    { id: 2, name: "Dermatologia" },
  ];

  private specialtiesSubject = new BehaviorSubject<Specialty[]>([...this.specialties]);
  public specialties$ = this.specialtiesSubject.asObservable();

  /** Retorna todas as especialidades como Observable */
  getSpecialties(): Observable<Specialty[]> {
    return this.specialties$;
  }

  /** Retorna uma especialidade por ID */
  getById(id: number): Specialty | undefined {
    return this.specialties.find(s => s.id === id);
  }

  /** Adiciona uma nova especialidade com ID automático */
  add(specialty: Omit<Specialty, 'id'>): void {
    const newId = this.specialties.length
      ? Math.max(...this.specialties.map(s => s.id ?? 0)) + 1
      : 1;
    const newSpecialty: Specialty = { ...specialty, id: newId };
    this.specialties.push(newSpecialty);
    this.specialtiesSubject.next([...this.specialties]);
  }

  /** Atualiza uma especialidade existente */
  update(updated: Specialty): void {
    if (!updated.id) return;
    const index = this.specialties.findIndex(s => s.id === updated.id);
    if (index !== -1) {
      this.specialties[index] = { ...updated };
      this.specialtiesSubject.next([...this.specialties]);
    }
  }

  /** Remove uma especialidade pelo ID */
  delete(id: number): void {
    this.specialties = this.specialties.filter(s => s.id !== id);
    this.specialtiesSubject.next([...this.specialties]);
  }
}
