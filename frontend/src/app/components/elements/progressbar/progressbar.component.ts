import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent {
  @Input() progressPercent: number;

  constructor() {
    this.progressPercent = 0; // Initialize the progressPercent if needed
  }
}