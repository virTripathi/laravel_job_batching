import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedDataComponent } from './processed-data.component';

describe('ProcessedDataComponent', () => {
  let component: ProcessedDataComponent;
  let fixture: ComponentFixture<ProcessedDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessedDataComponent]
    });
    fixture = TestBed.createComponent(ProcessedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
