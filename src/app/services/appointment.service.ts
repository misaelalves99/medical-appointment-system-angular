// src/app/services/appointment.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export enum AppointmentStatus {
  Scheduled = 'Scheduled',
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
}

export interface Appointment {
  id: number;
  patientId: number;
  patientName?: string;
  doctorId: number;
  doctorName?: string;
  appointmentDate: string;
  status: AppointmentStatus;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([
    {
      id: 1,
      patientId: 1,
      patientName: "João da Silva",
      doctorId: 2,
      doctorName: "Dra. Maria Oliveira",
      appointmentDate: "2025-08-15T14:30:00Z",
      status: AppointmentStatus.Confirmed,
      notes: "Paciente apresentou melhora significativa.",
    },
    {
      id: 2,
      patientId: 2,
      patientName: "Ana Paula",
      doctorId: 1,
      doctorName: "Dr. Carlos Souza",
      appointmentDate: "2025-08-16T10:00:00Z",
      status: AppointmentStatus.Pending,
    },
  ]);

  public appointments$ = this.appointmentsSubject.asObservable();

  // Retorna todos os appointments
  getAppointments(): Observable<Appointment[]> {
    return this.appointments$;
  }

  // Retorna appointment por ID
  getById(id: number): Observable<Appointment | undefined> {
    const appointment = this.appointmentsSubject.value.find(a => a.id === id);
    return of(appointment);
  }

  // Adiciona novo appointment
  add(appointment: Appointment) {
    const newId = this.appointmentsSubject.value.length
      ? Math.max(...this.appointmentsSubject.value.map(a => a.id)) + 1
      : 1;
    this.appointmentsSubject.next([...this.appointmentsSubject.value, { ...appointment, id: newId }]);
  }

  // Atualiza appointment existente
  update(updated: Appointment) {
    const updatedList = this.appointmentsSubject.value.map(a => a.id === updated.id ? { ...updated } : a);
    this.appointmentsSubject.next(updatedList);
  }

  // Remove appointment pelo ID
  delete(id: number) {
    const filteredList = this.appointmentsSubject.value.filter(a => a.id !== id);
    this.appointmentsSubject.next(filteredList);
  }
}
