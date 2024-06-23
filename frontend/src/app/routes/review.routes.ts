import { Routes } from "@angular/router";

export const review_routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('../medications/medication-details.component').then(c => c.MedicationDetailsComponent)
    },

    {
        path: 'add-review',
        loadComponent: () =>
            import('../reviews/review-add.component').then(c => c.AddReviewComponent),
        title: "Add Review to Medicine"
    },

    {
        path: 'update-review',
        loadComponent: () =>
            import('../reviews/review-update.component').then(c => c.UpdateReviewComponent),
        title: "Update Review to Medicine"
    }
]
    ;