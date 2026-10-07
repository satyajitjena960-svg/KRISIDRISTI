package com.example.expertreviewservice.controller;

import com.example.expertreviewservice.entity.ExpertReview;
import com.example.expertreviewservice.service.ExpertReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/expert/reviews")
public class ExpertReviewController {

    @Autowired
    private ExpertReviewService expertReviewService;

    @PostMapping
    public ResponseEntity<ExpertReview>createReview(@RequestBody ExpertReview expertReview){
       ExpertReview savedReview=expertReviewService.createReview(expertReview);
       return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ExpertReview>>getAllReviews(@RequestParam(required = false) String status){
        if(status!=null && !status.isBlank()){
            return ResponseEntity.ok(expertReviewService.getReviewByStatus(status));

        }
        return ResponseEntity.ok(expertReviewService.getAllReviews());
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<ExpertReview> getReviewById(@PathVariable String reviewId) {
        ExpertReview review = expertReviewService.getReviewById(reviewId);
        return ResponseEntity.ok(review);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ExpertReview> updateReview(
            @PathVariable String reviewId,
            @RequestParam String status,
            @RequestParam(required = false) String description) {
        ExpertReview updatedReview = expertReviewService.updateReviewStatus(reviewId, status, description);
        return ResponseEntity.ok(updatedReview);
    }


}
