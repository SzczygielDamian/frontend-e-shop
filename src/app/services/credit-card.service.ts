import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor() { }

  getCreditCardMonth(): Observable<number[]> {
    let data: number[] = [];

    for (let month = 1; month <= 12; month++) {
      data.push(month);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let year = startYear; year <= endYear; year++ ) {
      data.push(year);
    }

    return of(data);
  }
}
