import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { IMedication, IMedication_Response } from '../types/medications.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  $medication_state = signal<IMedication[]>([]);

  readonly #http = inject(HttpClient);

  // http methods
  addMedication(newMed: FormData) {
    return this.#http.post<IMedication_Response>
      (environment.BACKEND_SERVER_URL + '/medications', newMed);
  }
  addMedicationFromState(newMed: IMedication) {
    this.$medication_state.update(medication => [...medication, newMed]);
  }
  getMedications(char: string) {
    return this.#http.get<{ success: boolean, data: IMedication[]; }>
      (environment.BACKEND_SERVER_URL + `/medications?first_letter=${char}`);
  }

  getMedicationById(med_id: string) {
    return this.#http.get<{ success: boolean, data: IMedication; }>
      (environment.BACKEND_SERVER_URL + `/medications/${med_id}`);
  }

  deleteMedicationById(med_id: string) {
    return this.#http.delete<{ success: boolean, data: boolean; }>
      (environment.BACKEND_SERVER_URL + `/medications/${med_id}`);
  }

  updateMedicationById(updateMed: FormData) {
    const id = updateMed.get('_id') as string;
    return this.#http.put<{ success: boolean, data: boolean; }>
      (environment.BACKEND_SERVER_URL + `/medications/${id}`, updateMed);
  }

  updateMedByIdFromState(updatedMed: IMedication): void {
    this.$medication_state.set(
      this.$medication_state().map(medication =>
        medication._id === updatedMed._id ? updatedMed : medication
      ));
  }
  getImageByImageId(image_id: string) {
    this.#http.get<unknown>
      (environment.BACKEND_SERVER_URL + `/images/${image_id}`);

  }

  // async alidator to validate the name od medicine if already exist
  verifyMedExisted(object: { med_name: string; }) {
    return this.#http.post(environment.BACKEND_SERVER_URL + '/medications/verify', object);

  }
}
