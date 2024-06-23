import { Routes } from "@angular/router";

export const medication_Routes: Routes = [
    {
        path: "",
        loadComponent: () => import('../medications/medications-list.component')
            .then(c => c.ListMedicationsComponent),
        title: "List of Medication"
    },
    {
        path: 'list-medications',
        loadComponent: () => import('../medications/medications-list.component')
            .then(c => c.ListMedicationsComponent),
        title: "List of Medication"
    },
    {
        path: 'add-medication',
        loadComponent: () => import('../medications/medication-add.component')
            .then(c => c.AddMedicationComponent),
        title: "Add New Medication"
    },
    {
        path: 'update-medication',
        loadComponent: () => import('../medications/medication-update.component')
            .then(c => c.UpdateMedicationComponent),
        title: "Update Medication"
    },

    {
        path: 'medication-details',
        loadChildren: () => import('../routes/review.routes')
            .then(c => c.review_routes),
        title: " Medication Details"
    },




];