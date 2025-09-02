// src/app/pages/appointments/create/create-appointment.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService, Appointment, AppointmentStatus } from '../../../services/appointment.service';
import { PatientService, Patient } from '../../../services/patient.service';
import { DoctorService, Doctor } from '../../../services/doctor.service';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css'],
})
export class CreateAppointmentComponent implements OnInit {
  patients: Patient[] = [];
  doctors: Doctor[] = [];

  formData = {
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    status: AppointmentStatus.Scheduled, // ✅ default
    notes: '',
  };

  statusOptions = [
    { value: AppointmentStatus.Scheduled, label: 'Agendado' },
    { value: AppointmentStatus.Confirmed, label: 'Confirmado' },
    { value: AppointmentStatus.Cancelled, label: 'Cancelado' },
  ];

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
    });

    this.doctorService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });
  }

  handleSubmit(form: NgForm) {
    if (form.invalid) return;

    const patient = this.patients.find(p => p.id === Number(this.formData.patientId));
    const doctor = this.doctors.find(d => d.id === Number(this.formData.doctorId));

    const newAppointment: Appointment = {
      id: 0,
      patientId: Number(this.formData.patientId),
      doctorId: Number(this.formData.doctorId),
      patientName: patient?.name ?? '',
      doctorName: doctor?.name ?? '',
      appointmentDate: this.formData.appointmentDate,
      status: this.formData.status,
      notes: this.formData.notes,
    };

    this.appointmentService.add(newAppointment);
    this.router.navigate(['/appointments']);
  }

  handleCancel() {
    this.router.navigate(['/appointments']);
  }
}
