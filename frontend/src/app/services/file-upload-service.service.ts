import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Batch } from 'src/app/models/Batch';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  url:string = 'http://localhost:8000/api/';

  uploadFile(file: File): Observable<any> {
    console.log('a');
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
    // Observe upload progress (optional)
    return this.http.post<any>(this.url+'file-uploads', formData, {
      headers: headers
    });
  }

  trackBatchProgress(batchId:string):Observable<Batch> {
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
    // Observe upload progress (optional)
    return this.http.get<Batch>(this.url+'file-upload-batch/'+batchId, {
      headers: headers
    });
  }
}
