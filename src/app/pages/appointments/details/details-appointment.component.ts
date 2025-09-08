// src/pages/Appointment/Details/details-appointment.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService, Appointment } from '../../../services/appointment.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details-appointment.component.html',
  styleUrls: ['./details-appointment.component.css']
})
export class DetailsAppointmentComponent implements OnInit, OnDestroy {
  appointment: Appointment | null = null;
  private sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id !== null) {
      // Inscreve no Observable para pegar todos os appointments
      this.sub.add(
        this.appointmentService.appointments$.subscribe(appointments => {
          this.appointment = appointments.find(a => a.id === id) ?? null;

          if (!this.appointment) {
            console.warn(`Agendamento com ID ${id} não encontrado. Redirecionando.`);
            this.router.navigate(['/appointments']);
          }
        })
      );
    } else {
      console.warn('ID inválido. Redirecionando.');
      this.router.navigate(['/appointments']);
    }
  }

  get formattedDate(): string {
    if (!this.appointment) return '';
    return new Date(this.appointment.appointmentDate).toLocaleDateString('pt-BR');
  }

  get formattedTime(): string {
    if (!this.appointment) return '';
    return new Date(this.appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  navigateToEdit(): void {
    if (this.appointment?.id != null) {
      this.router.navigate([`/appointments/edit/${this.appointment.id}`]);
    }
  }

  navigateToList(): void {
    this.router.navigate(['/appointments']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
