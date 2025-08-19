// src/pages/patient/upload-profile-picture/upload-profile-picture.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-profile-picture',
  templateUrl: './upload-profile-picture.component.html',
  styleUrls: ['./upload-profile-picture.component.css'],
  standalone: true
})
export class UploadProfilePictureComponent {
  @Input() patientId!: number;
  @Input() patientName!: string;
  @Output() onUpload = new EventEmitter<File>();

  selectedFile: File | null = null;

  constructor(private router: Router) {}

  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  handleSubmit(): void {
    if (this.selectedFile) {
      this.onUpload.emit(this.selectedFile);
    }
  }

  goBack(): void {
    this.router.navigate(['/patient']);
  }
}
