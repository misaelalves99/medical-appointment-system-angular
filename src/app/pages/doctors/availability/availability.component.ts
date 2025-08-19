// src/pages/Doctor/Availability/availability.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DoctorAvailability {
  doctorId: number;
  date: string; // formato ISO (ex: "2025-08-08")
  startTime: string; // ex: "08:00"
  endTime: string;   // ex: "12:00"
  isAvailable: boolean;
}

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent {
  @Input() availabilities: DoctorAvailability[] = [];

  get sortedAvailabilities(): DoctorAvailability[] {
    return [...this.availabilities].sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.startTime).getTime();
      const dateB = new Date(b.date + 'T' + b.startTime).getTime();
      return dateA - dateB;
    });
  }
}
