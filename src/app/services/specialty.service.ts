// src/app/services/specialty.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Specialty {
  id: number;
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

  getSpecialties(): Observable<Specialty[]> {
    return this.specialtiesSubject.asObservable();
  }

  getById(id: number): Observable<Specialty | undefined> {
    return of(this.specialties.find(s => s.id === id));
  }

  add(specialty: Specialty) {
    this.specialties.push(specialty);
    this.specialtiesSubject.next([...this.specialties]);
  }

  update(updated: Specialty) {
    const index = this.specialties.findIndex(s => s.id === updated.id);
    if (index !== -1) {
      this.specialties[index] = updated;
      this.specialtiesSubject.next([...this.specialties]);
    }
  }

  delete(id: number) {
    this.specialties = this.specialties.filter(s => s.id !== id);
    this.specialtiesSubject.next([...this.specialties]);
  }
}
