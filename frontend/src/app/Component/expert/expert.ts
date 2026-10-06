import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, FormsModule],
  templateUrl: './expert.html',
  styleUrl: './expert.css'
})
export class Expert implements OnInit {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/expert/reviews';

  reviews: ExpertReview[] = [];
  selectedReview: ExpertReview | null = null;
  loading: boolean = false;
  errorMessage: string = '';

  selectedStatus: string = 'COMPLETED';
  advisoryDescription: string = '';
  submitting: boolean = false;

  ngOnInit(): void {
    this.reviews = this.getDefaultMockReviews();
    this.fetchReviews();
  }

  fetchReviews(): void {
    this.loading = false;
    this.errorMessage = '';

    const params = new HttpParams().set('status', 'PENDING');

    this.http.get<ExpertReview[]>(this.baseUrl, { params }).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.reviews = data;
        }
      },
      error: () => {
        // Keeps mock data active when backend is offline
      }
    });
  }

  getDefaultMockReviews(): ExpertReview[] {
    const leafIcon =
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="%232d6a4f"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.75C6.2 7.5 4.25 9.9 3 13.5c1.5-1.5 3.5-2.5 5.5-2.5 3 0 5 2 5 2s-2-3-4.5-3.5c3.5-1 7-1.5 8-1.5z"/></svg>';

    return [
      {
        reviewId: 'REV-1001',
        diagnosisId: 'DIAG-8821',
        cropName: 'Tomato',
        predictedDisease: 'Early Blight',
        confidenceScore: 0.54,
        status: 'PENDING',
        imageUrl: leafIcon
      },
      {
        reviewId: 'REV-1002',
        diagnosisId: 'DIAG-8825',
        cropName: 'Paddy / Rice',
        predictedDisease: 'Bacterial Leaf Blight',
        confidenceScore: 0.42,
        status: 'PENDING',
        imageUrl: leafIcon
      },
      {
        reviewId: 'REV-1003',
        diagnosisId: 'DIAG-8902',
        cropName: 'Potato',
        predictedDisease: 'Late Blight',
        confidenceScore: 0.48,
        status: 'PENDING',
        imageUrl: leafIcon
      }
    ];
  }

  formatPercent(score: number | undefined): number {
    return Math.round((score || 0) * 100);
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
        // Fallback update for testing while backend is offline
        this.finalizeSubmission(id);
      }
    });
  }

  private finalizeSubmission(id: string): void {
    alert(`Review #${id} submitted and marked as ${this.selectedStatus}!`);
    this.reviews = this.reviews.filter((r) => (r.reviewId || r.id) !== id);
    this.selectedReview = null;
    this.submitting = false;
  }
}