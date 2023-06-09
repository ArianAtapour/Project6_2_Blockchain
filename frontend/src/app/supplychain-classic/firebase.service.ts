import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private mgRef: AngularFireList<any>;
  private counterRef: AngularFireList<any>;
  private data: any;

  constructor(private afDatabase: AngularFireDatabase) {
    this.mgRef = afDatabase.list('textsWithRoles');
    this.counterRef = afDatabase.list('counters/counter');
    const data = {
      // @ts-ignore
      number: 0
    };
    this.counterRef.push(data);
  }

  addItemToDatabase(text: any, role: any): void {
    const data = {
      // @ts-ignore
      text : text,
      role: role
    };

    this.mgRef.push(data);
  }
  incrementCounter()
  {this.afDatabase.object('counters/counter/number')
    .valueChanges()
    .subscribe((snapshot) => {
      this.data = snapshot;
    });
      this.counterRef.push(this.data + 1);
  }

  getItemsFromDatabase(): Observable<any[]> {
    return this.mgRef.valueChanges();
  }
}
