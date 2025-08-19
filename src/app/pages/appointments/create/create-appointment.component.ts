// src/app/pages/appointments/create/create-appointment.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AppointmentFormData {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  status: string;
  notes: string;
}

interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent {
  @Input() patients: Option[] = [];
  @Input() doctors: Option[] = [];
  @Input() statusOptions: Option[] = [];

  @Output() onSubmit = new EventEmitter<AppointmentFormData>();
  @Output() onCancel = new EventEmitter<void>();

  formData: AppointmentFormData = {
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    status: '',
    notes: '',
  };

  handleSubmit() {
    this.onSubmit.emit(this.formData);
  }

  handleCancel() {
    this.onCancel.emit();
  }
}
