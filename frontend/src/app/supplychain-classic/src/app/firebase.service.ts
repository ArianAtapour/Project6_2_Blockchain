import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private mgRef: AngularFireList<any>;

  constructor(private afDatabase: AngularFireDatabase) {
    this.mgRef = afDatabase.list('textsWithRoles');
  }

  addItemToDatabase(text: any, role: any): void {
    const firebasePath = '/textsWithRoles'; // The path in your Firebase database


    const data = {
      // @ts-ignore
      text : text,
      role: role
    };

    this.mgRef.push(data);
  }

  getItemsFromDatabase(): Observable<any[]> {
    return this.mgRef.valueChanges();
  }
}
