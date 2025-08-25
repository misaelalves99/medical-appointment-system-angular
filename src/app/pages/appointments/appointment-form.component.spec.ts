// src/app/pages/appointments/appointment-form.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Appointment, AppointmentStatus } from '../../types/appointment.model';
import { AppointmentService } from '../../services/appointment.service';

interface FormState {
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  appointmentDate: string; // datetime-local
  status: AppointmentStatus;
  notes?: string;
}

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent implements OnInit {
  private appointmentService = inject(AppointmentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  mode: 'create' | 'edit' = 'create';
  state: FormState = {
    patientId: 0,
    patientName: '',
    doctorId: 0,
    doctorName: '',
    appointmentDate: this.toLocalDateTimeInput(new Date().toISOString()),
    status: AppointmentStatus.Scheduled,
    notes: '',
  };
  loading = false;
  errors: Record<string, string> = {};
  idParam?: number;

  ngOnInit(): void {
    const url = this.router.url;
    this.mode = url.includes('edit') ? 'edit' : 'create';
    this.idParam = Number(this.route.snapshot.paramMap.get('id'));

    if (this.mode === 'edit' && this.idParam) {
      this.loading = true;
      this.appointmentService.getById(this.idParam).subscribe((item) => {
        if (item) {
          // Acessar propriedades de forma segura
          this.state = {
            patientId: item['patientId'],
            patientName: item['patientName'] ?? '',
            doctorId: item['doctorId'],
            doctorName: item['doctorName'] ?? '',
            appointmentDate: this.toLocalDateTimeInput(item['appointmentDate']),
            status: item['status'],
            notes: item['notes'] ?? '',
          };
        }
        this.loading = false;
      });
    }
  }

  toLocalDateTimeInput(iso: string): string {
    const d = new Date(iso);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  fromLocalDateTimeInputToISO(val: string): string {
    return new Date(val).toISOString();
  }

  validate(): boolean {
    const e: Record<string, string> = {};
    if (!this.state.patientId || this.state.patientId <= 0)
      e['patientId'] = 'Paciente é obrigatório';
    if (!this.state.doctorId || this.state.doctorId <= 0)
      e['doctorId'] = 'Médico é obrigatório';
    if (!this.state.appointmentDate)
      e['appointmentDate'] = 'Data e hora são obrigatórias';
    this.errors = e;
    return Object.keys(e).length === 0;
  }

  handleSubmit(): void {
    if (!this.validate()) return;

    const payload: Omit<Appointment, 'id'> = {
      patientId: this.state.patientId,
      patientName: this.state.patientName,
      doctorId: this.state.doctorId,
      doctorName: this.state.doctorName,
      appointmentDate: this.fromLocalDateTimeInputToISO(
        this.state.appointmentDate
      ),
      status: this.state.status,
      notes: this.state.notes,
    };

    if (this.mode === 'create') {
      this.appointmentService.getAppointments().subscribe((all) => {
        const newId = all.length > 0 ? Math.max(...all.map((a) => a.id)) + 1 : 1;
        this.appointmentService.add({ id: newId, ...payload });
        this.router.navigate(['/appointments']);
      });
    } else if (this.mode === 'edit' && this.idParam) {
      this.appointmentService.update({ id: this.idParam, ...payload });
      this.router.navigate(['/appointments']);
    }
  }

  handleCancel(): void {
    this.router.navigate(['/appointments']);
  }
}
