import { Injectable, inject } from '@angular/core';
import { Observable, combineLatest, switchMap } from 'rxjs';
import { Item } from '../models/item';
import { Database, limitToFirst, listVal, objectVal, query, ref } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private database: Database = inject(Database);

  getItem(id: number): Observable<Item> {
    const itemRef = ref(this.database, `/v0/item/${id}`);
    return objectVal<Item>(itemRef);
  }

  topStories() {
    const topStoriesRef = ref(this.database, '/v0/topstories');
    const topQuery = query(topStoriesRef, limitToFirst(30));
    return listVal<number>(topQuery).pipe(
      switchMap((ids) => combineLatest(ids.map((id) => this.getItem(id))))
    );
  }
}
