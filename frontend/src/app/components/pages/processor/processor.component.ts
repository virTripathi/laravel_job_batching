import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload-service.service';
import { Subscription,interval } from 'rxjs';

@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.css']
})
export class ProcessorComponent {
  constructor(private fileUploadService:FileUploadService) {
  }

  title = 'Batch Processor';
  progress: number = 0;
  progressSubscription: Subscription | undefined;
  onSubmit(event: Event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const progressBarElement = document.getElementById('progressbar') as HTMLDivElement;
    progressBarElement.classList.remove('hidden');

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0];
      if (!file || !file.type.startsWith('text/csv')) {
        alert('Please upload a valid CSV file');
        return;
      }
      console.log('Uploading file:', file.name);

      this.fileUploadService.uploadFile(file).subscribe(
        (response: any) => {
          console.log('File upload started', response);
          this.trackProgress(response.id);
        },
        (error: any) => {
          console.error('Upload failed:', error);
          this.resetProgress();
        }
      );
    }
  }

  trackProgress(batchId: string) {
    const pollingInterval = 5000; // Poll every 5 seconds
    this.progressSubscription = interval(pollingInterval).subscribe(() => {
      this.getProgress(batchId);
    });
  }

  getProgress(batchId: string) {
    this.fileUploadService.trackBatchProgress(batchId).subscribe(
      (response: any) => {
        this.progress = response.progress;
        console.log('Progress:', this.progress);

        if (this.progress >= 100) {
          console.log('Upload complete');
          this.stopProgressTracking();
        }
      },
      (error: any) => {
        console.error('Progress tracking failed:', error);
        this.stopProgressTracking();
      }
    );
  }

  stopProgressTracking() {
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
    this.progress = 100; // Ensure progress is set to 100 on completion
  }

  resetProgress() {
    this.progress = 0;
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
    const progressBarElement = document.getElementById('progressbar') as HTMLDivElement;
    progressBarElement.classList.add('hidden');
  }
}
