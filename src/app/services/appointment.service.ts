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
  appointmentDate: string; // ISO string
  status: AppointmentStatus;
  notes?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointments: Appointment[] = [
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
  ];

  private appointmentsSubject = new BehaviorSubject<Appointment[]>([...this.appointments]);
  public appointments$ = this.appointmentsSubject.asObservable();

  // Retorna todos os appointments como Observable
  getAppointments(): Observable<Appointment[]> {
    return this.appointments$;
  }

  // Retorna um appointment por ID
  getById(id: number): Observable<Appointment | undefined> {
    const appointment = this.appointments.find(a => a.id === id);
    return of(appointment);
  }

  // Adiciona um novo appointment
  add(appointment: Appointment) {
    const newId = this.appointments.length > 0
      ? Math.max(...this.appointments.map(a => a.id)) + 1
      : 1;

    this.appointments.push({ ...appointment, id: newId });
    this.appointmentsSubject.next([...this.appointments]);
  }

  // Atualiza um appointment existente
  update(updated: Appointment) {
    const index = this.appointments.findIndex(a => a.id === updated.id);
    if (index !== -1) {
      this.appointments[index] = { ...updated };
      this.appointmentsSubject.next([...this.appointments]);
    }
  }

  // Remove um appointment pelo ID
  delete(id: number) {
    this.appointments = this.appointments.filter(a => a.id !== id);
    this.appointmentsSubject.next([...this.appointments]);
  }
}
