// src/app/services/appointment.service.ts

import { Injectable } from '@angular/core';
import { Appointment, AppointmentStatus } from '../types/appointment.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
  ];

  private appointmentsSubject = new BehaviorSubject<Appointment[]>([...this.appointments]);

  getAppointments(): Observable<Appointment[]> {
    return this.appointmentsSubject.asObservable();
  }

  getById(id: number): Observable<Appointment | undefined> {
    const appointment = this.appointments.find(a => a.id === id);
    return of(appointment);
  }

  add(appointment: Appointment) {
    this.appointments.push(appointment);
    this.appointmentsSubject.next([...this.appointments]);
  }

  update(updated: Appointment) {
    const index = this.appointments.findIndex(a => a.id === updated.id);
    if (index !== -1) {
      this.appointments[index] = updated;
      this.appointmentsSubject.next([...this.appointments]);
    }
  }

  delete(id: number) {
    this.appointments = this.appointments.filter(a => a.id !== id);
    this.appointmentsSubject.next([...this.appointments]);
  }
}
