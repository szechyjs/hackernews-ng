import { Component, OnInit, inject } from '@angular/core';
import { Database, limitToFirst, listVal, objectVal, query, ref } from '@angular/fire/database';
import { Observable, combineLatest, forkJoin, from, map, mergeMap, of, reduce, switchMap, tap, toArray } from 'rxjs';

interface Item {
  id: number;
  dead?: boolean;
  deleted?: boolean;
  descendants?: number;
  by: string;
  kids: number[];
  title: string;
  score: number;
  text?: string;
  time: number;
  type: 'story' | 'job' | 'comment' | 'poll' | 'pollopt';
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private database: Database = inject(Database);
  stories$: Observable<Item[]>;

  constructor() {
    const topStoriesRef = ref(this.database, '/v0/topstories');
    const topQuery = query(topStoriesRef, limitToFirst(30));
    this.stories$ = listVal<number>(topQuery).pipe(
      switchMap((ids) => {
        return combineLatest(ids.map(id => this.getItem(id))
        )
      }),
      tap(() => console.log('new data'))
    );
  }

  ngOnInit() {

  }

  getItem(id: number): Observable<Item> {
    const itemRef = ref(this.database, `/v0/item/${id}`);
    return objectVal<Item>(itemRef);
  }

  itemTrack(index: number, item: Item) {
    return item.id;
  }
}
