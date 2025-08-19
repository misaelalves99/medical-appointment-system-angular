// src/pages/patient/history/history-patient.component.ts

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface PatientHistoryItem {
  recordDate: string; // ISO string
  description: string;
  notes?: string | null;
}

@Component({
  selector: 'app-history-patient',
  templateUrl: './history-patient.component.html',
  styleUrls: ['./history-patient.component.css'],
  standalone: true
})
export class HistoryPatientComponent {
  @Input() history: PatientHistoryItem[] = [];

  constructor(private router: Router) {}

  get sortedHistory(): PatientHistoryItem[] {
    return [...this.history].sort(
      (a, b) => new Date(b.recordDate).getTime() - new Date(a.recordDate).getTime()
    );
  }

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR');
  }

  goBack(): void {
    this.router.navigate(['/patient']);
  }
}
