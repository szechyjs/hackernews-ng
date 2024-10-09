import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService {
  private snackBar = inject(MatSnackBar);

  constructor(swUpdate: SwUpdate) {
    swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
    ).subscribe(() => {
      this.promptReload();
    });
  }

  promptReload() {
    this.snackBar.open('New version available', 'Reload')
      .onAction().subscribe(() => {
        document.location.reload();
      });
  }
}
