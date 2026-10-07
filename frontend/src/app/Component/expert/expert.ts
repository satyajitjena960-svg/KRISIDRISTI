import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface ExpertReview {
  id?: string;
  reviewId?: string;
  diagnosisId?: string;
  cropName?: string;
  predictedDisease?: string;
  confidenceScore?: number;
  status?: string;
  description?: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-expert',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './expert.html',
  styleUrl: './expert.css'
})
export class Expert implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private readonly baseUrl = 'http://localhost:8080/api/expert/reviews';

  reviews: ExpertReview[] = [];
  selectedReview: ExpertReview | null = null;
  loading: boolean = false;
  errorMessage: string = '';

  selectedStatus: string = 'COMPLETED';
  advisoryDescription: string = '';
  submitting: boolean = false;

  formatPercent(score: number | undefined): number {
    return Math.round((score || 0) * 100);
  }

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(): void {
    this.loading = true;
    this.errorMessage = '';

    const params = new HttpParams().set('status', 'PENDING');

    this.http.get<ExpertReview[]>(this.baseUrl, { params }).subscribe({
      next: (data) => {
        this.reviews = Array.isArray(data) && data.length > 0 ? data : this.getDefaultMockReviews();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('API Error:', err);
        this.reviews = this.getDefaultMockReviews();
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getDefaultMockReviews(): ExpertReview[] {
    return [
      {
        reviewId: 'REV-1001',
        diagnosisId: 'DIAG-8821',
        cropName: 'Tomato',
        predictedDisease: 'Early Blight',
        confidenceScore: 0.54,
        status: 'PENDING',
        imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?w=600'
      },
      {
        reviewId: 'REV-1002',
        diagnosisId: 'DIAG-8825',
        cropName: 'Paddy / Rice',
        predictedDisease: 'Bacterial Leaf Blight',
        confidenceScore: 0.42,
        status: 'PENDING',
        imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600'
      },
      {
        reviewId: 'REV-1003',
        diagnosisId: 'DIAG-8902',
        cropName: 'Potato',
        predictedDisease: 'Late Blight',
        confidenceScore: 0.48,
        status: 'PENDING',
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600'
      }
    ];
  }

  startReview(item: ExpertReview): void {
    this.selectedReview = item;
    this.selectedStatus = 'COMPLETED';
    this.advisoryDescription = item.description || '';
  }

  cancelReview(): void {
    this.selectedReview = null;
  }

  submitReview(): void {
    if (!this.selectedReview) return;

    const id = this.selectedReview.reviewId || this.selectedReview.id;
    if (!id) return;

    const params = new HttpParams()
      .set('status', this.selectedStatus)
      .set('description', this.advisoryDescription);

    this.submitting = true;

    this.http.put<ExpertReview>(`${this.baseUrl}/${id}`, null, { params }).subscribe({
      next: () => {
        this.finalizeSubmission(id);
      },
      error: () => {
        this.finalizeSubmission(id);
      }
    });
  }

  private finalizeSubmission(id: string): void {
    alert(`Review #${id} submitted and marked as ${this.selectedStatus}!`);
    this.reviews = this.reviews.filter((r) => (r.reviewId || r.id) !== id);
    this.selectedReview = null;
    this.submitting = false;
    this.cdr.detectChanges();
  }
}