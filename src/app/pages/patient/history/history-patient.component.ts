// src/pages/patient/history/history-patient.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  standalone: true,
  imports: [CommonModule]  // ← Import necessário para *ngFor e *ngIf
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
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  goBack(): void {
    this.router.navigate(['/patient']);
  }
}
