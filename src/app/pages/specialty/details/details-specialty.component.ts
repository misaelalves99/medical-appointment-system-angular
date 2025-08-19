// src/pages/specialty/details/details-specialty.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details-specialty',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details-specialty.component.html',
  styleUrls: ['./details-specialty.component.css']
})
export class DetailsSpecialtyComponent {
  @Input() id!: number;
  @Input() name!: string;
}
