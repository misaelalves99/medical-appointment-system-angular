// src/app/pages/appointments/edit/edit-appointment.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService, Appointment, AppointmentStatus } from '../../../services/appointment.service';
import { PatientService, Patient } from '../../../services/patient.service';
import { DoctorService, Doctor } from '../../../services/doctor.service';

@Component({
  selector: 'app-edit-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css'],
})
export class EditAppointmentComponent implements OnInit {
  appointmentId!: number;
  patients: Patient[] = [];
  doctors: Doctor[] = [];

  formData = {
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    status: '',
    notes: '',
  };

  statusOptions = [
    { value: AppointmentStatus.Scheduled, label: 'Agendada' },
    { value: AppointmentStatus.Confirmed, label: 'Confirmada' },
    { value: AppointmentStatus.Cancelled, label: 'Cancelada' },
    { value: AppointmentStatus.Completed, label: 'Concluída' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    // ✅ assinando observables corretamente
    this.patientService.getPatients().subscribe((patients) => {
      this.patients = patients;
    });

    this.doctorService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) this.appointmentId = Number(idParam);

    this.appointmentService.getById(this.appointmentId).subscribe((appointment) => {
      if (appointment) {
        this.formData = {
          patientId: appointment.patientId.toString(),
          doctorId: appointment.doctorId.toString(),
          appointmentDate: appointment.appointmentDate.slice(0, 16), // datetime-local
          status: appointment.status,
          notes: appointment.notes || '',
        };
      }
    });
  }

  handleSubmit(form: NgForm) {
    if (form.invalid) return;

    const updatedAppointment: Appointment = {
      id: this.appointmentId,
      patientId: Number(this.formData.patientId),
      doctorId: Number(this.formData.doctorId),
      appointmentDate: new Date(this.formData.appointmentDate).toISOString(),
      status: this.formData.status as AppointmentStatus,
      notes: this.formData.notes,
    };

    this.appointmentService.update(updatedAppointment);
    this.router.navigate(['/appointments']);
  }

  handleCancel() {
    this.router.navigate(['/appointments']);
  }
}
