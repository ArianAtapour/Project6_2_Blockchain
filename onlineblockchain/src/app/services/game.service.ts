import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private buttonState: { [departmentId: number]: number } = {};
  private buttonStateSubject: BehaviorSubject<{
    [departmentId: number]: number;
  }> = new BehaviorSubject(this.buttonState);

  setButtonState(departmentId: number, buttonIndex: number): void {
    this.buttonState[departmentId] = buttonIndex;
    this.buttonStateSubject.next(this.buttonState);
  }

  getButtonState(departmentId: number): number {
    return this.buttonState[departmentId] || 0;
  }

  getButtonStateObservable(departmentId: number): Observable<number> {
    return this.buttonStateSubject.pipe(
      map((buttonState) => buttonState[departmentId] || 0)
    );
  }
}
